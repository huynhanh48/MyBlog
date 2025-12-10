"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CommentEditor = dynamic(() => import("./CommentEditor"), { ssr: false });

interface Comment {
  _id: string;
  username: string;
  content: string;
  parentId: string | null;
  createdAt: string;
}

interface CommentListProps {
  idPost: string;
}

export default function CommentList({ idPost }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?id=${idPost}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!idPost) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/comments?id=${idPost}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [idPost]);

  const parentComments = comments.filter((c) => !c.parentId);
  const getReplies = (parentId: string) =>
    comments.filter((c) => c.parentId === parentId);

  return (
    <div className="mt-4 space-y-4">
      <div className="text-sm text-gray-700 font-semibold mb-2">
        Tất cả bình luận
      </div>
      {parentComments.length === 0 ? (
        <p>Chưa có bình luận nào</p>
      ) : (
        parentComments.map((c) => (
          <div key={c._id} className="border p-2 rounded">
            <div className="font-semibold">{c.username}</div>
            <div dangerouslySetInnerHTML={{ __html: c.content }} />
            <div className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </div>

            <button
              className="text-blue-500 text-sm mt-1"
              onClick={() => setReplyTo(replyTo === c._id ? null : c._id)}
            >
              {replyTo === c._id ? "Hủy trả lời" : "Trả lời"}
            </button>

            {/* Comment con */}
            <div className="ml-6 mt-2 space-y-2">
              {getReplies(c._id).map((r) => (
                <div key={r._id} className="border-l border-gray-300 pl-2">
                  <div className="font-semibold">{r.username}</div>
                  <div dangerouslySetInnerHTML={{ __html: r.content }} />
                  <div className="text-xs text-gray-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Editor reply */}
            {replyTo === c._id && (
              <CommentEditor
                idPost={idPost}
                parentId={c._id}
                onCommentAdded={() => {
                  fetchComments();
                  setReplyTo(null);
                }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import CommentList from "./CommentList";

interface Props {
  idPost: string;
  parentId?: string;
  onCommentAdded?: () => void;
}

export default function CommentEditor({
  idPost,
  parentId,
  onCommentAdded,
}: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  // Khởi tạo Quill editor
  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Viết bình luận...",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ list: "bullet" }],
          ["link"],
        ],
      },
    });
  }, []);

  const handleSubmit = async () => {
    if (!quillRef.current) return;

    const content = quillRef.current.root.innerHTML.trim();
    if (!content) return alert("Bạn chưa viết gì!");
    if (!username.trim()) return alert("Bạn chưa nhập tên!");

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idPost,
          content,
          username,
          parentId: parentId || null,
        }),
      });

      if (!res.ok) throw new Error("Gửi comment thất bại");

      quillRef.current.setText("");
      setUsername("");
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group mt-2">
      <div
        ref={editorRef}
        style={{ minHeight: "100px" }}
        className="border  p-2"
      />
      <div className="flex justify-between  items-center mt-2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
        <input
          className="p-1 border outline-0 border-gray-400 rounded-sm mr-2 flex-1"
          type="text"
          placeholder="Tên của bạn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-500 cursor-pointer text-white rounded-sm px-4 py-1"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi"}
        </button>
      </div>
      <div className="">
        <CommentList idPost={idPost} />
      </div>
    </div>
  );
}

"use client";

import { formatted } from "@/utilize/date";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import dynamic from "next/dynamic";
import "prismjs/themes/prism-tomorrow.css";

const CommentEditor = dynamic(() => import("@/app/components/CommentEditor"), {
  ssr: false,
});

// Skeleton component
function SkeletonArticle() {
  return (
    <div className="px-28 max-md:px-4 max-lg:px-4 flex-1 animate-pulse">
      <div className="h-6 w-40 bg-gray-200 rounded mb-8"></div>

      <div className="flex gap-4 my-4">
        <div className="h-12 w-12 rounded-full bg-gray-300" />

        <div className="flex-1">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-[90%]"></div>
        <div className="h-4 bg-gray-200 rounded w-[80%]"></div>
        <div className="h-4 bg-gray-200 rounded w-[95%]"></div>
        <div className="h-4 bg-gray-200 rounded w-[70%]"></div>
      </div>

      <div className="bg-gray-300 h-[1px] mt-6 mb-6"></div>

      <div className="h-40 bg-gray-200 rounded"></div>
    </div>
  );
}

export interface Article {
  _id: string;
  img: string;
  category: string;
  brief: string;
  author?: string | null;
  date: Date;
  content: string;
}

export default function ViewPost() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const GetArticles = async () => {
    try {
      if (!id) return;

      const response = await fetch(`/api/postitems/?id=${id}`);

      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function FetchData() {
      await GetArticles();
    }
    FetchData();
  }, [id]);

  if (loading) return <SkeletonArticle />;

  return (
    <div className="px-28 max-md:px-4 max-lg:px-4 flex-1">
      <div className="editor-main">
        <h1 className="text-2xl mb-8 font-medium/7 ">
          {article?.category ?? ""}
        </h1>

        <div className="flex gap-4 my-4">
          <span className="h-12 w-12 rounded-full inline-flex justify-center items-center bg-gray-200">
            <FaRegUser className="text-xl font-bold" />
          </span>

          <div className="w-full">
            <span className="font-semibold text-gray-700 text-xl">
              {article?.author ?? "anonymous"}
            </span>

            <div className="flex justify-between">
              <span>Author</span>
              <span>{article?.date ? formatted(article.date) : ""}</span>
            </div>
          </div>
        </div>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article?.content ?? "" }}
        />
      </div>

      <div className="bg-gray-400 h-[1px] mt-4 mb-4"></div>

      {id && <CommentEditor idPost={id} />}
    </div>
  );
}

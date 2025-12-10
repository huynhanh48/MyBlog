"use client";
import { formatted } from "@/utilize/date";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";

const CommentEditor = dynamic(() => import("@/app/components/CommentEditor"), {
  ssr: false,
});

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

  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  console.log("pagram URL : ", id);
  const GetArticles = async function () {
    try {
      const response = await fetch(`/api/postitems/?id=${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
        console.log("byid : ", data);
      } else {
        console.error("Failed to fetch articles", response.status);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await GetArticles();
    };
    fetchData();
  }, []);

  return (
    <div className="px-28  max-md:px-4 max-lg:px-4 flex-1">
      {!article ? (
        <p>Loading...</p>
      ) : (
        <div className="editor-main">
          <h1 className="text-2xl mb-8 font-medium/7 ">{article.category}</h1>
          <div className="flex gap-4 my-4">
            <span className="h-12 rounded-full w-12 inline-flex justify-center items-center bg-gray-200">
              <FaRegUser className="text-xl font-bold" />
            </span>
            <div className="w-full">
              <span className="font-semibold text-gray-700 text-xl">
                {article.author ?? "anonymous"}
              </span>
              <div className="flex justify-between">
                <span>Author</span> <span>{formatted(article.date)}</span>
              </div>
            </div>
          </div>

          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      )}
      <div className="bg-gray-400 h-[1px] mt-4 mb-4"></div>
      {id && <CommentEditor idPost={id} />}
    </div>
  );
}

"use client";
import { Posts } from "@/app/(no-layout)/dashboard/column";
import TINYEditor from "@/app/components/editor";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { Article } from "../view/page";
const defaultForm: Posts = {
  _id: "",
  category: "",
  brief: "",
  author: "",
  content: "",
  img: "",
  trending: false,
  date: new Date(),
};

export default function EditPost() {
  const [form, setForm] = useState<Posts>(defaultForm);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const GetArticle = async function () {
    try {
      const response = await fetch(`/api/postitems/?id=${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setForm(data);
        console.log("byid : ", data);
      } else {
        console.error("Failed to fetch articles", response.status);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleSubmitBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/postitems/allposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");

      const data = await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    async function fetchData() {
      await GetArticle();
    }
    fetchData();
  }, []);
  return (
    <div className="px-28 ">
      <h1 className="text-2xl font-bold text-center">Tạo bài viết</h1>
      <div className="flex justify-between size-full mt-4 gap-10">
        {/* Form blog */}
        <div className="w-full ">
          <form
            onSubmit={handleSubmitBlog}
            className="size-full flex flex-col gap-10 "
          >
            <div className="w-full flex flex-col gap-4  h-full">
              <div className="w-full flex flex-col ">
                <label className="font-bold ">Tiêu đề bài viết</label>
                <input
                  type="text"
                  name="category"
                  value={form?.category}
                  onChange={onChangeForm}
                  placeholder="Category"
                  className="outline-0 border h-12 border-gray-200 rounded-sm px-2 text-[18px]"
                />
              </div>
              <div className="w-full flex flex-col ">
                <label className="font-bold ">Đường dẫn ảnh bài viết</label>
                <input
                  type="text"
                  name="img"
                  value={form?.img}
                  onChange={onChangeForm}
                  placeholder="Đường dẫn ảnh bài viết"
                  className="outline-0 border h-12 border-gray-200 rounded-sm px-2 text-[18px]"
                />
              </div>
              <div className="w-full flex flex-col ">
                <label className="font-bold ">Nội dung tóm tắt</label>
                <textarea
                  name="brief"
                  value={form.brief}
                  onChange={onChangeForm}
                  placeholder="Nội dung tóm tắt"
                  className="outline-0 h-56 border border-gray-200 rounded-sm px-2 text-[18px]"
                />
              </div>
            </div>
            <div className="w-full flex flex-col ">
              <label className="font-bold">Nội dung bài viết</label>
              <TINYEditor
                value={form.content}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, content: val }))
                }
              />
            </div>
            <div className="w-full  mb-20 cursor-pointer flex flex-col">
              <input
                type="submit"
                className="bg-blue-300 cursor-pointer rounded-sm py-2"
                value="Cập nhật bài viết"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Images, ImagesCol } from "./(images)/columnimages";
import { DataTable } from "./(images)/data-table";

export default function ImageDashboard() {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Images[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  };
  const GetImages = async function () {
    try {
      const response = await fetch("/api/images", { method: "GET" });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return alert("Hãy chọn ảnh!");

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);

      const res = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setUrl(data.data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Upload thất bại");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function FetchData() {
      await GetImages();
    }
    FetchData();
  }, []);

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md p-4 rounded-md border max-w-lg"
      >
        <div className="flex gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 px-4 text-white rounded-md"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {image && (
          <p className="mt-2 text-sm text-green-600">✔ Đã chọn: {image.name}</p>
        )}
      </form>

      {url && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-medium mb-1">Secure URL:</p>
          <input
            value={url}
            readOnly
            onClick={(e) => e.currentTarget.select()}
            className="w-full border p-2 rounded text-sm"
          />
        </div>
      )}
      <div className="mt-2">
        <DataTable columns={ImagesCol} data={data} />
      </div>
    </div>
  );
}

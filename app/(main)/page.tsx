/* eslint-disable @next/next/no-img-element */
"use client";
import { PaginationWithLinks } from "@/components/ui/pagination-with-link";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import LoadingUI from "../components/loadingUI";
import { formatted } from "@/utilize/date";
import SlideShow from "./slideshow";
import TrendingCard from "../components/trendingcard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Quill from "quill";

interface Article {
  _id: string;
  img: string;
  category: string;
  brief: string;
  author?: string | null;
  date: Date;
  trending: boolean;
}

interface Pagination {
  page: number;
  pagesize: number;
  count: number;
}
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [articlesTrend, setArticlesTrend] = useState<Article[]>([]);
  const params = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    pagesize: 6,
    count: 0,
  });
  const getTrendingArticles = async () => {
    try {
      const res = await fetch("/api/postitems/allposts", { method: "GET" });

      if (!res.ok) throw new Error("Failed to fetch trending");

      const data = await res.json();
      setArticlesTrend(data);
    } catch (error) {
      console.error(error);
    }
  };
  const GetArticles = async function () {
    // await delay(10000);
    try {
      const response = await fetch(
        `/api/postitems?page=${page}&pagesize=${pagination.pagesize}`,
        { method: "GET" }
      );
      if (response.ok) {
        const { data, total, page, pageSize } = await response.json();
        setArticles(data);
        setPagination({
          page,
          pagesize: pageSize,
          count: total,
        });
      } else {
        console.error("Failed to fetch articles", response.status);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await GetArticles();
      await getTrendingArticles();
    };
    fetchData();
  }, []);
  if (loading) {
    return <LoadingUI count={pagination.pagesize} />;
  } else
    return (
      <div className="w-full  max-md:px-4   px-28 row ">
        {/* <div className="w-full flex-col mb-4  flex items-center gap-4">
          <div className="text-2xl font-semibold">
            Khám phá các bài viết mới
          </div>
          <p className="text-gray-700">Trend xu hướng của Trading SMC</p>
        </div> */}
        <SlideShow />

        <div className="flex gap-10 ">
          {/* articles */}
          <div className="grid  flex-7 grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 auto-rows-[400px] gap-8 ">
            {articles.length > 0 &&
              articles.map((el) => (
                <div key={el._id} className="h-full">
                  <div className="h-1/2 w-full ">
                    <img
                      src={el.img}
                      className="w-full h-full object-cover  rounded-xl"
                      alt=""
                    />
                  </div>
                  <div className="flex items-center mt-2 gap-4">
                    <FaUserCircle className="text-2xl text-gray-700" />
                    <p>{formatted(el.date)}</p>
                  </div>
                  <p className="line-clamp-1 mt-2 font-medium text-xl text-[#212121] ">
                    {el.category}
                  </p>
                  <p className="line-clamp-3 h-18">{el.brief}</p>
                  <Link
                    href={{
                      pathname: "/postitems/view",
                      query: {
                        id: el._id,
                      },
                    }}
                    className="font-medium inline-block hover:translate-x-2 transition-all duration-300 bg-gray-100 cursor-pointer px-2  py-1"
                  >
                    READ MORE
                  </Link>
                </div>
              ))}
          </div>
          {/* Trend */}
          <div className="flex-3 w-full flex  max-lg:hidden gap-5 flex-col">
            <h2 className="text-xl font-semibold">Trending Post</h2>
            {articlesTrend.map((e) => (
              <div key={e._id}>
                <TrendingCard
                  _id={e._id}
                  img={e.img}
                  category={e.category}
                  author={e.author}
                  date={e.date}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <PaginationWithLinks
            page={page}
            pageSize={pagination.pagesize}
            totalCount={pagination.count}
          />
        </div>
      </div>
    );
}

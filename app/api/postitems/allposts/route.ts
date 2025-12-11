import { NextRequest, NextResponse } from "next/server";
import PostItem from "@/models/postItem";
import dbConnect from "@/config/db";
dbConnect();
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const allParam = url.searchParams.get("all");

  try {
    let posts;

    if (allParam === "1") {
      posts = await PostItem.find().sort({ date: -1 });
    } else {
      posts = await PostItem.find({ trending: true })
        .sort({ date: -1 })
        .limit(3);
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  console.log("post update");
  try {
    const body = await request.json();
    const { _id } = body;

    const updatedPost = await PostItem.findByIdAndUpdate(
      _id,
      {
        img: body.img,
        category: body.category,
        brief: body.brief,
        author: body.author ?? null,
        content: body.content,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { message: "SERVICE ERROR", error: String(error) },
      { status: 500 }
    );
  }
}

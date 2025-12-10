import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/db";
import Comments from "@/models/comment";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing id" }, { status: 400 });
  }

  try {
    const comments = await Comments.find({ idPost: id }).sort({
      createdAt: 1,
    });
    return NextResponse.json(comments);
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.idPost || !body.content) {
    return NextResponse.json(
      { message: "idPost and content are required" },
      { status: 400 }
    );
  }

  try {
    const newComment = await Comments.create({
      idPost: body.idPost,
      username: body.username || "Ẩn Danh",
      content: body.content,
      parentId: body.parentId || null,
      replyTo: body.replyTo || null,
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}

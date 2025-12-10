import PostItem from "@/models/postItem";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const id = params.get("id");
  try {
    await PostItem.findByIdAndDelete(id);
    return NextResponse.json({
      message: "delete successfully",
      id,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error invalid!",
      error,
    });
  }
}

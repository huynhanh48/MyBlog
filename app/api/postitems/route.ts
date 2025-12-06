import dbConnect from "@/config/db";
import PostItem from "@/models/postItem";

dbConnect();

export async function GET() {
  const PostItems = await PostItem.find();
  return Response.json(PostItems);
}
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const newPost = await PostItem.create({
      img: body.img,
      category: body.category,
      date: body.date,
      brief: body.brief,
      author: body.author ?? null,
    });

    return Response.json(newPost, { status: 201 });
  } catch (error) {
    return Response.json({
      message: "error data when send",
      error,
    });
  }
}

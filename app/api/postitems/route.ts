// app/api/postitems/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/db";
import PostItem from "@/models/postItem";
// export async function GET(req:NextRequest) {
//   const  url =  new URL(req.url);
//   const pagrams = new URLSearchParams(url.searchParams);
//   const id   =  pagrams.get("id");
//   const page = Number(pagrams.get("page")) || 0;
//   const pagesize = Number(pagrams.get("pagesize")) || 8;
//   console.log(pagrams);
//   await dbConnect();
//   if(!id){
//     const posts = await PostItem.find().skip(page * pagesize)
//     .limit(pagesize);;
//     return NextResponse.json({data :posts,total: posts.length});
//   }
//   else
//   {
//     const post =  await  PostItem.findById(id);
//     if(post){
//       return  NextResponse.json(post);
//     }
//   }
// }
await dbConnect();
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.searchParams);

  const id = params.get("id");
  const page = Number(params.get("page")) || 1;
  const pageSize = Number(params.get("pagesize")) || 8;
  const skipValue = page == 1  ? 0: (page - 1) * pageSize ;


  if (id) {
    const post = await PostItem.findById(id);
    return NextResponse.json(post);
  }

  const totalCount = await PostItem.countDocuments(); 
  const posts = await PostItem.find().sort({date:-1})
    .skip(skipValue)
    .limit(pageSize);

  return NextResponse.json({
    data: posts,
    total: totalCount,  
    page,
    pageSize
  });
}

export async function POST(request: NextRequest) {


  try {
    const body = await request.json();
    const post = new PostItem({
      img: body.img,
      category: body.category,
      brief: body.brief,
      author: body.author ?? null,
      content: body.content,
    });

    const newPost = await post.save(); 
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "SERVICE ERROR", error: String(error) },
      { status: 500 }
    );
  }
}

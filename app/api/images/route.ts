import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import ImageItem from "@/models/image";

// ⭐ Quan trọng: bắt buộc cho Buffer hoạt động
export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadFile = async (file: File, folder: string) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          reject(error);
        } else resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploaded = await uploadFile(file, "my-blog");
    const { secure_url, width, height } = uploaded;
    await ImageItem.create({
      url: secure_url,
      width,
      height,
    });
    return NextResponse.json({
      message: "Upload successful",
      data: uploaded,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await ImageItem.find();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "errorr API", error });
  }
}

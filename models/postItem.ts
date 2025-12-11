import mongoose from "mongoose";

const PostItemSchema = new mongoose.Schema({
  img: { type: String, required: true },
  category: { type: String },
  brief: { type: String },
  date: { type: Date, default: Date.now },
  author: { type: String, default: null },
  avatar: { type: String, default: null },
  top: { type: Boolean, default: false },
  trending: { type: Boolean, default: true },
  content: { type: String },
});

const PostItem =
  mongoose.models.Postitem || mongoose.model("Postitem", PostItemSchema);
export default PostItem;

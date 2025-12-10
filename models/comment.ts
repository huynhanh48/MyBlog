import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    idPost: { type: String, required: true },
    username: { type: String, default: "Ẩn Danh" },
    content: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    replyTo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Comments =
  mongoose.models.CommentSchema || mongoose.model("Comments", CommentSchema);

export default Comments;

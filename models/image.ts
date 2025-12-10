import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    width: { type: String, default: null },
    height: { type: String, default: null },
  },
  { timestamps: true }
);

const ImageItem = mongoose.models.Image || mongoose.model("Image", ImageSchema);

export default ImageItem;

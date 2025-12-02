import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    syllabus: [{ type: String }], // array of module titles
    price: { type: Number, required: true },
    category: { type: String },
    tags: [{ type: String }],
    thumbnail: { type: String },
    rating: { type: Number, default: 4.8 },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);

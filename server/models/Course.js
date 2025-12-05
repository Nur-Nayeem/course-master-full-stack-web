import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema({
  questions: [questionSchema],
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String },
  duration: { type: String },
  quiz: quizSchema,
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    thumbnail: { type: String },
    price: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    studentsCount: { type: Number, default: 0 },
    category: { type: String, index: true },
    tags: [{ type: String, index: true }],
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

// For fast search on title, instructor, and description
courseSchema.index({ title: "text", instructor: "text", description: "text" });
// For filtering & sorting by category and price
courseSchema.index({ category: 1, price: 1 });
// For tags filtering + sorting
courseSchema.index({ tags: 1, createdAt: -1 });

export default mongoose.model("Course", courseSchema);

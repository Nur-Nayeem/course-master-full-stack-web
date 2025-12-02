import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String },
  duration: { type: String },
});

const batchSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true }, // name only
    thumbnail: { type: String },
    price: { type: Number, default: 0 },
    oldPrice: { type: Number },
    rating: { type: Number, default: 4.5 },
    studentsCount: { type: Number, default: 0 },
    category: { type: String, index: true },
    tags: [{ type: String, index: true }],
    lessons: [lessonSchema], // lessons inside course
    batches: [batchSchema], // optional batches
    features: {
      videos: { type: Number },
      exercises: { type: Number },
      articles: { type: Number },
      resources: { type: Number },
      lifetime: { type: Boolean },
      certificate: { type: Boolean },
    },
  },
  { timestamps: true }
);

// text index for searching by title/instructor/description/tags
courseSchema.index({
  title: "text",
  instructor: "text",
  description: "text",
  tags: "text",
});

export default mongoose.model("Course", courseSchema);

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  lessonIndex: { type: Number, required: true },
  answerText: String,
  driveLink: String,
  submittedAt: { type: Date, default: Date.now },
  reviewed: { type: Boolean, default: false },
  grade: { type: Number },
  reviewerComment: String,
});

const quizAttemptSchema = new mongoose.Schema({
  lessonIndex: Number,
  answers: [{ qIndex: Number, answer: String }],
  score: Number,
  takenAt: { type: Date, default: Date.now },
});

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    lessonsCompleted: [{ type: Number }],
    progress: { type: Number, default: 0 },

    quizzes: [quizAttemptSchema],

    assignments: [assignmentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);

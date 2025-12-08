import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import { auth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ userId })
      .populate("courseId")
      .lean();
    res.send({ enrollments });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/:courseId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send({ message: "Course not found" });

    const exists = await Enrollment.findOne({ userId, courseId });
    if (exists) return res.send({ isEnrolled: true });

    const enrollment = await Enrollment.create({
      userId,
      courseId,
      lessonsCompleted: [],
      progress: 0,
    });

    await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });

    res.send({ message: "Enrolled", enrollment });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/:courseId/isEnrolled", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const exists = await Enrollment.findOne({ userId, courseId });

    return res.send({ isEnrolled: !!exists });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/:enrollId/complete", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { enrollId } = req.params;
    const { lessonIndex } = req.body;

    const enrollment = await Enrollment.findById(enrollId);
    if (!enrollment)
      return res.status(404).send({ message: "Enrollment not found" });
    if (enrollment.userId.toString() !== userId)
      return res.status(403).send({ message: "Not authorized" });

    if (!enrollment.lessonsCompleted.includes(lessonIndex)) {
      enrollment.lessonsCompleted.push(lessonIndex);
    }

    const course = await Course.findById(enrollment.courseId);
    const totalLessons = (course.lessons || []).length || 1;
    enrollment.progress = Math.round(
      (enrollment.lessonsCompleted.length / totalLessons) * 100
    );

    await enrollment.save();
    res.send({
      message: "Marked complete",
      progress: enrollment.progress,
      lessonsCompleted: enrollment.lessonsCompleted,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/:enrollId/assignment", auth, async (req, res) => {
  try {
    const { enrollId } = req.params;
    const { lessonIndex, driveLink } = req.body;
    const userId = req.user.id;

    const enrollment = await Enrollment.findById(enrollId);
    if (!enrollment)
      return res.status(404).send({ message: "Enrollment not found" });
    if (enrollment.userId.toString() !== userId)
      return res.status(403).send({ message: "Not authorized" });

    const existingIndex = enrollment.assignments.findIndex(
      (a) => a.lessonIndex === lessonIndex
    );
    if (existingIndex >= 0) {
      // Update existing submission
      enrollment.assignments[existingIndex].driveLink = driveLink;
      enrollment.assignments[existingIndex].submittedAt = new Date();
    } else {
      enrollment.assignments.push({ lessonIndex, driveLink });
    }

    await enrollment.save();
    res.send({
      message: "Assignment submitted",
      assignments: enrollment.assignments,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/:enrollId/quiz", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { enrollId } = req.params;
    const { lessonIndex, score } = req.body;

    const enrollment = await Enrollment.findById(enrollId);
    if (!enrollment)
      return res.status(404).send({ message: "Enrollment not found" });

    if (enrollment.userId.toString() !== userId)
      return res.status(403).send({ message: "Not authorized" });

    const existingIndex = enrollment.quizzes.findIndex(
      (q) => q.lessonIndex === lessonIndex
    );
    if (existingIndex >= 0) {
      enrollment.quizzes[existingIndex].score = score;
      enrollment.quizzes[existingIndex].takenAt = new Date();
    } else {
      enrollment.quizzes.push({
        lessonIndex,
        score,
        takenAt: new Date(),
      });
    }

    await enrollment.save();
    res.send({
      message: "Quiz score saved",
      quizScores: enrollment.quizzes,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;

import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.send({ userId })
      .populate("courseId")
      .lean();
    res.json({ enrollments });
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
    if (exists) return res.status(400).send({ message: "Already enrolled" });

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

export default router;

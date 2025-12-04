// routes/adminEnrollments.js
import express from "express";
import Enrollment from "../models/Enrollment.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const { courseId, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (courseId) filter.courseId = courseId;
    const total = await Enrollment.countDocuments(filter);
    const enrollments = await Enrollment.find(filter)
      .populate("userId", "name email")
      .populate("courseId", "title")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    res.send({
      page: +page,
      total,
      totalPages: Math.ceil(total / limit),
      enrollments,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// get enrollments by course
router.get("/course/:courseId", auth, isAdmin, async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollments = await Enrollment.find({ courseId })
      .populate("userId", "name email")
      .lean();
    res.send({ enrollments });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;

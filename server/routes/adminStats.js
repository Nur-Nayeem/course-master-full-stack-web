import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    // Count progress states
    const inProgress = await Enrollment.countDocuments({
      progress: { $ne: 100 },
    });

    const completed = await Enrollment.countDocuments({
      progress: 100,
    });

    res.send({
      stats: {
        totalCourses,
        totalEnrollments,
        inProgress,
        completed,
      },
    });
  } catch (err) {
    console.error("Failed to load admin stats", err);
    res.status(500).send({ message: "Failed to load admin stats" });
  }
});

export default router;

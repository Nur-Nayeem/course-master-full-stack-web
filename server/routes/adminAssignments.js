// routes/adminAssignments.js
import express from "express";
import Enrollment from "../models/Enrollment.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// GET all assignments (optionally filter by course)
router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const { courseId } = req.query;
    // aggregate assignments across enrollments
    const filter = {};
    if (courseId) filter.courseId = courseId;

    const enrollments = await Enrollment.find(filter)
      .populate("userId", "name email")
      .populate("courseId", "title")
      .lean();

    const assignments = [];
    enrollments.forEach((en) => {
      en.assignments?.forEach((a, idx) => {
        assignments.push({
          enrollmentId: en._id,
          assignmentIndex: idx,
          user: en.userId,
          course: en.courseId,
          lessonIndex: a.lessonIndex,
          answerText: a.answerText,
          driveLink: a.driveLink,
          submittedAt: a.submittedAt,
          reviewed: a.reviewed,
          grade: a.grade,
          reviewerComment: a.reviewerComment,
        });
      });
    });

    res.json({ assignments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REVIEW / GRADE assignment
router.post(
  "/:enrollmentId/:assignmentIndex/review",
  auth,
  isAdmin,
  async (req, res) => {
    try {
      const { enrollmentId, assignmentIndex } = req.params;
      const { grade, reviewerComment } = req.body;

      const enrollment = await Enrollment.findById(enrollmentId);
      if (!enrollment)
        return res.status(404).json({ message: "Enrollment not found" });

      const assignment = enrollment.assignments[assignmentIndex];
      if (!assignment)
        return res.status(404).json({ message: "Assignment not found" });

      assignment.reviewed = true;
      assignment.grade = grade;
      assignment.reviewerComment = reviewerComment;

      // IMPORTANT FIX 🚀
      enrollment.markModified("assignments");

      await enrollment.save();

      res.json({ message: "Reviewed", assignment });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;

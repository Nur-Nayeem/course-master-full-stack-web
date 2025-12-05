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

    const assignments = await Enrollment.aggregate([
      { $match: filter },
      { $unwind: "$assignments" },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $project: {
          enrollmentId: "$_id",
          assignmentIndex: "$assignments.lessonIndex",
          user: { name: "$user.name", email: "$user.email" },
          course: { title: "$course.title" },
          lessonIndex: "$assignments.lessonIndex",
          answerText: "$assignments.answerText",
          driveLink: "$assignments.driveLink",
          submittedAt: "$assignments.submittedAt",
          reviewed: "$assignments.reviewed",
          grade: "$assignments.grade",
          reviewerComment: "$assignments.reviewerComment",
        },
      },
    ]);

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

      // convert to number
      const index = Number(assignmentIndex);
      const assignment = enrollment.assignments.find(
        (a) => a.lessonIndex === index
      );

      if (!assignment)
        return res.status(404).json({ message: "Assignment not found" });

      assignment.reviewed = true;
      assignment.grade = grade;
      assignment.reviewerComment = reviewerComment;

      enrollment.markModified("assignments");

      await enrollment.save();

      res.json({ message: "Reviewed", assignment });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;

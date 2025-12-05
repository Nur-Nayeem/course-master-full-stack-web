// routes/adminCourses.js
import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { validate } from "../middleware/validate.js";
import { courseValidationSchema } from "../validation/course.validation.js";

const router = express.Router();

// GET all (admin view) with optional pagination
router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 25, search } = req.query;
    const query = {};
    if (search) query.$text = { $search: search };

    const total = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      page: +page,
      total,
      totalPages: Math.ceil(total / limit),
      courses,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// create course
router.post(
  "/",
  auth,
  isAdmin,
  validate(courseValidationSchema),
  async (req, res) => {
    try {
      const data = req.body;
      const course = await Course.create(data);
      res.send({ message: "Created", course });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
);

// get single course (admin)
router.get("/:id", auth, isAdmin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).lean();
    if (!course) return res.status(404).send({ message: "Course not found" });
    res.send({ course });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// update course (full body)
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({ message: "Updated", course: updated });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    await Enrollment.deleteMany({ courseId: req.params.id });
    res.send({ message: "Deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;

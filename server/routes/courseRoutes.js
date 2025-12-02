import express from "express";
import Course from "../models/Course.js";
const router = express.Router();

//    GET ALL COURSES (PUBLIC)

router.get("/", async (req, res) => {
  try {
    let { page, limit, search, category, sort } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 12;

    const query = {};

    // Searching
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { instructor: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Sorting
    let sortQuery = {};
    if (sort === "price_asc") sortQuery.price = 1;
    else if (sort === "price_desc") sortQuery.price = -1;

    const total = await Course.countDocuments(query);

    const courses = await Course.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    res.send({
      page,
      totalPages: Math.ceil(total / limit),
      totalCourses: total,
      courses,
    });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

//    GET SINGLE COURSE DETAILS

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Invalid ID format" });
  }
});

export default router;

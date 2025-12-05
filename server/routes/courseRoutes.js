import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let {
      page = 1,
      limit = 12,
      search,
      category,
      sort,
      tags,
      popular,
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { instructor: { $regex: search, $options: "i" } },
      ];
    }

    // if (search) {
    //   filter.$text = { $search: search };
    // }

    if (category) filter.category = category;
    if (tags) {
      const tagArr = tags.split(",").map((t) => t.trim());
      filter.tags = { $in: tagArr };
    }

    let sortQuery = { createdAt: -1 };
    if (popular === "true") {
      sortQuery = { rating: -1, studentsCount: -1 }; // top-rated, then most students
    } else if (sort === "price_asc") {
      sortQuery = { price: 1 };
    } else if (sort === "price_desc") {
      sortQuery = { price: -1 };
    }

    const total = await Course.countDocuments(filter);

    const courses = await Course.find(filter)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.send({
      page,
      limit,
      totalCourses: total,
      totalPages: Math.ceil(total / limit),
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

// GET: Get single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).lean();
    if (!course) return res.status(404).send({ message: "Course not found" });

    res.send({ course });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

export default router;

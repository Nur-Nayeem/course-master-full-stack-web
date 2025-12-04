// routes/adminAnalytics.js
import express from "express";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

router.get("/enrollments", async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 3;

    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);

    // Aggregate enrollments by date
    const agg = await Enrollment.aggregate([
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Build full day list (even days with zero)
    const dayMap = {};
    agg.forEach((d) => {
      dayMap[d._id] = d.count;
    });

    const out = [];
    for (let i = 0; i < days; i++) {
      const dt = new Date(start);
      dt.setDate(start.getDate() + i);
      const key = dt.toISOString().slice(0, 10);
      out.push({ date: key, count: dayMap[key] || 0 });
    }

    res.send({ data: out });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to build analytics" });
  }
});

export default router;

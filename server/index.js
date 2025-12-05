import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollRoutes from "./routes/enrollRoutes.js";

import adminAuthRoutes from "./routes/adminAuth.js";
import adminCoursesRoutes from "./routes/adminCourses.js";
import adminEnrollmentsRoutes from "./routes/adminEnrollments.js";
import adminAssignmentsRoutes from "./routes/adminAssignments.js";
import adminAnalyticsRoutes from "./routes/adminAnalytics.js";

import adminStatsRoutes from "./routes/adminStats.js";

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// app.get((req, res) => {
//   console.log("server is running");
// });

app.use("/api/auth", authRoutes);

app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollRoutes);

app.use("/api/admin", adminStatsRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/courses", adminCoursesRoutes);
app.use("/api/admin/enrollments", adminEnrollmentsRoutes);
app.use("/api/admin/assignments", adminAssignmentsRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));

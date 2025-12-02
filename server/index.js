import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courseRoutes.js";
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// app.get((req, res) => {
//   console.log("server is running");
// });

app.use("/api/auth", authRoutes);

app.use("/api/courses", courseRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));

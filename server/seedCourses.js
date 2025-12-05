import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Course from "./models/Course.js";

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Course.insertMany([
    {
      title: "Full Stack Web Development",
      description: "Learn MERN stack from scratch with hands-on projects.",
      instructor: "John Doe",
      thumbnail: "https://placehold.co/600x400",
      price: { $numberInt: "120" },
      rating: { $numberDouble: "4.8" },
      category: "Web Development",
      tags: ["JavaScript", "React", "Node"],
      lessons: [
        {
          title: "Introduction to Web Development",
          videoUrl: "https://www.youtube.com/embed/h9q2NHFhLks",
          duration: "12:30",
          quiz: {
            questions: [
              {
                questionText: "What does MERN stand for?",
                options: [
                  "MongoDB, Express, React, Node",
                  "MySQL, Express, React, Next.js",
                  "MongoDB, Electron, Redux, Node",
                ],
                correctAnswer: { $numberInt: "0" },
              },
              {
                questionText: "Which language runs in the browser?",
                options: ["Python", "JavaScript", "PHP"],
                correctAnswer: { $numberInt: "1" },
              },
            ],
          },
        },
        {
          title: "HTML & CSS Basics",
          videoUrl: "https://www.youtube.com/embed/ZAqIoDhornk",
          duration: "18:10",
          quiz: {
            questions: [
              {
                questionText: "What does HTML stand for?",
                options: [
                  "Hyper Trainer Marking Language",
                  "HyperText Markup Language",
                  "HighText Machine Language",
                ],
                correctAnswer: { $numberInt: "1" },
              },
              {
                questionText: "Which CSS property controls text size?",
                options: ["font-style", "text-size", "font-size"],
                correctAnswer: { $numberInt: "2" },
              },
            ],
          },
        },
        {
          title: "JavaScript Fundamentals",
          videoUrl: "https://www.youtube.com/embed/ZAqIoDhornk",
          duration: "22:00",
          quiz: {
            questions: [
              {
                questionText:
                  "Which keyword declares a variable in JavaScript?",
                options: ["var", "let", "Both var and let"],
                correctAnswer: { $numberInt: "2" },
              },
              {
                questionText: "What is the output of typeof []?",
                options: ["array", "object", "list"],
                correctAnswer: { $numberInt: "1" },
              },
            ],
          },
        },
        {
          title: "React Basics",
          videoUrl: "https://www.youtube.com/embed/react_basics",
          duration: "20:15",
          quiz: {
            questions: [
              {
                questionText: "Which hook is used to manage state?",
                options: ["useState", "useEffect", "useContext"],
                correctAnswer: { $numberInt: "0" },
              },
            ],
          },
        },
        {
          title: "Node.js & Express",
          videoUrl: "https://www.youtube.com/embed/node_express",
          duration: "25:00",
          quiz: {
            questions: [
              {
                questionText:
                  "Which method is used to create a server in Node.js?",
                options: [
                  "http.createServer",
                  "express.createApp",
                  "node.startServer",
                ],
                correctAnswer: { $numberInt: "0" },
              },
            ],
          },
        },
      ],
      studentsCount: { $numberInt: "0" },
    },
  ]);

  console.log("Courses seeded!");
  process.exit();
});

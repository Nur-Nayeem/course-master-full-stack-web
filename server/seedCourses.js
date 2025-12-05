import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Course from "./models/Course.js";

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Course.insertMany([
    {
      title: "Full-Stack Web Development Bootcamp 2025",
      slug: "full-stack-web-dev-2025",
      description:
        "Master HTML, CSS, JavaScript, React, Node.js, MongoDB, and build full-stack projects.",
      instructor: {
        name: "Mr. James Carter",
        role: "Senior Software Engineer",
        about: "8+ years of experience in full-stack development.",
        avatar: "https://i.ibb.co/8j5pPKR/teacher1.png",
      },
      thumbnail: "https://i.ibb.co/SffbS2C/course1.png",
      price: 79.99,
      oldPrice: 129.99,
      rating: 4.8,
      studentsCount: 15200,
      category: "Web Development",
      tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      content: [
        {
          title: "Introduction to Web Development",
          lessons: [
            { title: "What is Web Development?", duration: "08:15" },
            { title: "Frontend vs Backend", duration: "10:00" },
          ],
        },
        {
          title: "React Fundamentals",
          lessons: [
            { title: "React Components", duration: "12:30" },
            { title: "Props & State", duration: "14:10" },
          ],
        },
      ],
    },
    {
      title: "UI/UX Design Mastery 2025",
      slug: "ui-ux-design-2025",
      description:
        "Learn UI/UX from fundamentals to advanced tools like Figma, prototyping, and usability testing.",
      instructor: {
        name: "Sarah Mitchell",
        role: "UX Designer",
        about: "Worked with 15+ global brands as a lead designer.",
        avatar: "https://i.ibb.co/tH8Q2L8/teacher2.png",
      },
      thumbnail: "https://i.ibb.co/C6fBdDr/course2.png",
      price: 59.99,
      oldPrice: 109.99,
      rating: 4.7,
      studentsCount: 9800,
      category: "UI/UX Design",
      tags: ["Figma", "Prototyping", "Design Thinking", "Wireframes"],
      content: [
        {
          title: "Introduction to UI/UX",
          lessons: [
            { title: "What is UI/UX?", duration: "07:40" },
            { title: "Design Thinking Process", duration: "11:20" },
          ],
        },
        {
          title: "Figma Basics",
          lessons: [
            { title: "Frames & Layouts", duration: "15:10" },
            { title: "Color & Typography", duration: "09:55" },
          ],
        },
      ],
    },
    {
      title: "Python for Data Science & Machine Learning",
      slug: "python-data-science-2025",
      description:
        "Learn NumPy, Pandas, Matplotlib, and machine learning basics using Python.",
      instructor: {
        name: "Dr. Angela Yu",
        role: "Data Scientist",
        about: "15+ years in data analytics and ML.",
        avatar: "https://i.ibb.co/XbXP3rL/teacher3.png",
      },
      thumbnail: "https://i.ibb.co/ZM5XZ1y/course3.png",
      price: 84.99,
      oldPrice: 129.99,
      rating: 4.9,
      studentsCount: 50400,
      category: "Data Science",
      tags: ["Python", "NumPy", "Pandas", "Machine Learning"],
      content: [
        {
          title: "Python Basics",
          lessons: [
            { title: "Variables & Types", duration: "10:20" },
            { title: "Loops & Conditions", duration: "14:00" },
          ],
        },
        {
          title: "Data Analysis",
          lessons: [
            { title: "Working with Pandas", duration: "16:10" },
            { title: "Cleaning Data", duration: "12:50" },
          ],
        },
      ],
    },
  ]);

  console.log("Courses seeded!");
  process.exit();
});

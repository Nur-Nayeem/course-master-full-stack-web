import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Course from "./models/Course.js";

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Course.insertMany([
    {
      title: "Flutter App Development Masterclass",
      instructor: "Kevin Parker",
      description:
        "Build beautiful cross-platform mobile apps using Flutter and Dart with real-world projects.",
      syllabus: ["Dart Basics", "Widgets", "State Management", "Firebase"],
      price: 64,
      category: "App Development",
      tags: ["flutter", "dart"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Django REST Framework API Development",
      instructor: "Zara Sheikh",
      description:
        "Create scalable backend APIs using Django REST Framework with authentication and deployment.",
      syllabus: ["Django", "DRF", "JWT Auth", "Deployment"],
      price: 55,
      category: "Backend",
      tags: ["django", "api", "backend"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "SQL & Database Design",
      instructor: "William Scott",
      description:
        "Master SQL queries, joins, normalization, indexing, and relational database design.",
      syllabus: ["MySQL", "Queries", "Normalization", "Joins"],
      price: 37,
      category: "Database",
      tags: ["sql", "database"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Blockchain Development with Solidity",
      instructor: "Haruki Tanaka",
      description:
        "Learn blockchain concepts, Ethereum, and smart contract development using Solidity.",
      syllabus: ["Solidity", "Smart Contracts", "Web3.js", "Metamask"],
      price: 99,
      category: "Blockchain",
      tags: ["solidity", "web3"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "3D Modeling with Blender",
      instructor: "Aria Lopez",
      description:
        "Learn 3D modeling, sculpting, lighting, animation, and rendering with Blender.",
      syllabus: ["Modeling", "Sculpting", "Animation", "Rendering"],
      price: 40,
      category: "Design",
      tags: ["blender", "3d"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "R Programming for Data Analysis",
      instructor: "Victor Hughes",
      description:
        "Analyze datasets, visualize trends, and perform statistical modeling using R.",
      syllabus: ["R Basics", "Visualization", "Statistics", "Data Analysis"],
      price: 44,
      category: "Data Science",
      tags: ["r", "statistics"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Android Development with Kotlin",
      instructor: "Priya Sharma",
      description:
        "Learn modern Android development using Kotlin, Jetpack Compose, and MVVM.",
      syllabus: ["Kotlin", "Compose", "MVVM", "APIs"],
      price: 67,
      category: "App Development",
      tags: ["kotlin", "android"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "C++ Programming & Algorithms",
      instructor: "Alexander Griffin",
      description:
        "Master C++ fundamentals, STL, data structures, algorithms, and problem solving.",
      syllabus: ["Basics", "STL", "DSA", "Projects"],
      price: 50,
      category: "Programming",
      tags: ["cpp", "dsa"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "WordPress for Beginners",
      instructor: "Isabella Reed",
      description:
        "Learn to create websites, blogs, and eCommerce stores without coding.",
      syllabus: ["Themes", "Plugins", "SEO", "eCommerce"],
      price: 32,
      category: "Web Development",
      tags: ["wordpress", "cms"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Big Data with Hadoop & Spark",
      instructor: "Ethan Collins",
      description:
        "Learn big data processing, distributed systems, Hadoop ecosystem, and Apache Spark.",
      syllabus: ["Hadoop", "HDFS", "MapReduce", "Spark"],
      price: 88,
      category: "Data Science",
      tags: ["bigdata", "spark"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Project Management with Agile & Scrum",
      instructor: "Natalie Moore",
      description:
        "Understand Agile workflow, Scrum framework, sprint planning, and team management.",
      syllabus: ["Agile", "Scrum", "Sprints", "Team Management"],
      price: 41,
      category: "Management",
      tags: ["agile", "scrum"],
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Excel for Data Analytics",
      instructor: "Marcus Allen",
      description:
        "Learn advanced Excel functions, pivot tables, dashboards, and data analytics skills.",
      syllabus: ["Formulas", "Pivot Tables", "Charts", "Dashboards"],
      price: 28,
      category: "Data Analytics",
      tags: ["excel", "analytics"],
      thumbnail: "https://placehold.co/600x400",
    },
  ]);

  console.log("Courses seeded!");
  process.exit();
});

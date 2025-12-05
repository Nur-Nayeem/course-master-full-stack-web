# Course Master

Course Master is a **MERN stack** web application designed to provide a seamless online learning experience for students and instructors. It allows users to explore courses, enroll, track progress, complete lessons, submit assignments, take quizzes, and for admins to manage courses, enrollments, and analytics.

---

## Features

### Public Features

- **Home / Course Listing**
  - Display all available courses.
  - Advanced Features: Server-side pagination, searching by title/instructor, sorting by price, filtering by category/tags.
- **Course Details**
  - Detailed course view (Title, Description, Instructor, Syllabus, Price).
  - "Enroll Now" button to enroll in courses.

### Student Dashboard

- View list of enrolled courses.
- Progress tracking (e.g., "60% Completed").
- Watch video lectures.
- Mark lessons as completed (updates progress bar).
- Submit assignments (via Google Drive link).
- Take quizzes (multiple-choice) with instant scoring.

### Admin Features (Protected)

- **Course Management**
  - Create, Read, Update, Delete (CRUD) courses.
  - Define course batches (e.g., Batch 1 starts Jan 1st).
- **Enrollment Management**
  - View all students enrolled in a course or batch.
- **Assignment Review**
  - Review submitted assignments, grade, and provide feedback.
- **Analytics Dashboard**
  - Chart enrollments over time (using Recharts or Chart.js).

### Optimization & Utilities

- Database indexing for search and filtering.
- Prevent N+1 query problems.
- Caching "All Courses" API using **Tanstack Query**.
- Welcome email sent upon registration (**Nodemailer**).
- Input validation using **Joi**.

---

## Tech Stack

- **Frontend:** React.js, React Router, Tailwind CSS, React Hook Form
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **State Management:** Tanstack Query
- **Other Libraries:** Axios, SweetAlert2, Recharts, Chart.js, Lucide-react

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Nur-Nayeem/course-master-full-stack-web.git
cd course-master
```

### 2. Install backend dependencies

```bash
cd server
npm install

```

### 3. Install frontend dependencies

```bash
cd ../client
npm install

```

### 4. Environment Variables

Create a .env file in the server directory:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

```

### 5. Run the application

Backend

```bash
cd server
npm run dev
```

Frontend

```bash
cd client
npm start

```

Frontend runs on http://localhost:3173

Backend runs on http://localhost:5000

## API Routes

### Auth

- POST /api/auth/register → Register new user

- POST /api/auth/login → Login

- GET /api/auth/me → Get current user (Protected)

### Courses

- GET /api/courses → List courses with pagination, search, sort, filter

- GET /api/courses/:id → Get single course details

### Enrollments

- GET /api/enrollments/me → Get user enrollments

- POST /api/enrollments/:courseId → Enroll in a course

- POST /api/enrollments/:enrollId/complete → Mark lesson complete

- POST /api/enrollments/:enrollId/assignment → Submit assignment

- POST /api/enrollments/:enrollId/quiz → Submit quiz score

### Admin

- GET /api/admin/stats → Admin dashboard stats

- GET /api/admin/courses → List all courses (Admin)

- POST /api/admin/courses → Create course

- PUT /api/admin/courses/:id → Update course

- DELETE /api/admin/courses/:id → Delete course

- GET /api/admin/enrollments → View all enrollments

- GET /api/admin/assignments → View submitted assignments

- POST /api/admin/assignments/:enrollmentId/:assignmentIndex/review → Review assignment

- GET /api/admin/analytics/enrollments → Enrollment analytics

## Live Links:

- Frontend: [https://course-master-nur-nayeem.netlify.app](https://course-master-nur-nayeem.netlify.app/)

- Backend: [https://server-ivory-two.vercel.app](https://server-ivory-two.vercel.app/)

- Github: [https://github.com/Nur-Nayeem/course-master-full-stack-web](https://github.com/Nur-Nayeem/course-master-full-stack-web)

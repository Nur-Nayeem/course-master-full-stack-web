import { createBrowserRouter } from "react-router";
import MainLayoute from "../Layoutes/MainLayoute";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import Courses from "../pages/Courses/Courses";
import CourseDetailsPage from "../pages/CourseDetails/CourseDetailsPage";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";
import CoursePlayer from "../pages/Courses/CoursePlayer";
import AdminLayout from "../Layoutes/AdminLayout";
import AdminRoute from "./adminRoute/AdminRoute";
import AdminCourses from "../pages/Admin/AdminCoursesManager";
import AdminCourseCreate from "../pages/Admin/AdminCourseCreate";
import AdminCourseEdit from "../pages/Admin/AdminCourseEdit";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminCourseEnrollments from "../pages/Admin/AdminCourseEnrollments";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayoute,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/courses",
        Component: Courses,
      },
      {
        path: "/courses/:id",
        Component: CourseDetailsPage,
      },
      {
        path: "/courses/:id/player",
        element: (
          <PrivateRoute>
            <CoursePlayer />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <StudentDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: AdminDashboard,
      },
      {
        path: "courses",
        Component: AdminCourses,
      },
      {
        path: "courses/create",
        Component: AdminCourseCreate,
      },
      {
        path: "courses/edit/:id",
        Component: AdminCourseEdit,
      },
      {
        path: "enrollments",
        Component: AdminCourseEnrollments,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
export default router;

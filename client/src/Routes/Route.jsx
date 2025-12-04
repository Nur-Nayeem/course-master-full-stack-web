import { createBrowserRouter } from "react-router";
import MainLayoute from "../Layoutes/MainLayoute";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import Courses from "../pages/Courses/Courses";
import CourseDetailsPage from "../pages/CourseDetails/CourseDetailsPage";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";

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
        element: <h2>Course Player</h2>,
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
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
export default router;

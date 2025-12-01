import { createBrowserRouter } from "react-router";
import MainLayoute from "../Layoutes/MainLayoute";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayoute,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
export default router;

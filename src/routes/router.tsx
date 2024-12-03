import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { routeGenerator } from "../utils/RouterGenerator";
import { userPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout></DashboardLayout>,
    children: routeGenerator(userPaths),
  },
]);
export default router;

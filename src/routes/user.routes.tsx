import AddTask from "../pages/Dashboard/AddTask";
import ManageTask from "../pages/Dashboard/ManageTask";

export const userPaths = [
  {
    name: "Add Task",
    path: "add-task",
    element: <AddTask></AddTask>,
  },
  {
    name: "Manage Task",
    path: "manage-task",
    element: <ManageTask></ManageTask>,
  },
];

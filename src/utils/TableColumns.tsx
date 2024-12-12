import { RiDeleteBin5Fill } from "react-icons/ri";
import TaskModal from "../pages/Dashboard/TaskModal";
import { TTask } from "../types/Sidebar.type";
import axios from "axios";
import { notification } from "antd";

const handleDeleteTask = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://kiln-task-backend.vercel.app/api/v1/tasks/${id}`
    );

    if (response.status === 200) {
      notification.success({
        message: "Task Deleted",
        description: "The task has been successfully deleted.",
        placement: "topRight",
      });
    } else {
      notification.error({
        message: "Deletion Failed",
        description: "Failed to delete the task. Please try again.",
        placement: "topRight",
      });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    notification.error({
      message: "Error",
      description: "An error occurred while deleting the task.",
      placement: "topRight",
    });
  }
};

export const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "name",
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "age",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "address",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_: string, record: TTask) => (
      <div>
        <TaskModal task={record}></TaskModal>
        <button
          onClick={() => handleDeleteTask(record._id)}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          <RiDeleteBin5Fill className="text-xl text-red-600"></RiDeleteBin5Fill>
        </button>
      </div>
    ),
  },
];

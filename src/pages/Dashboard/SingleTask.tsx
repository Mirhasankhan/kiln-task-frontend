import { RiDeleteBin5Fill } from "react-icons/ri";
import TaskModal from "./TaskModal";
import { useUpdateTaskMutation } from "../../redux/features/task/taskManagement.api";
import Swal from "sweetalert2";
import { IoMdCheckmark } from "react-icons/io";
import { toast } from "sonner";
import { TTask } from "../../types/Sidebar.type";
import axios from "axios";

const SingleTask = ({ task }: { task: TTask }) => {
  const [changeStatus] = useUpdateTaskMutation();
  const handleStatusChange = (id: string) => {
    changeStatus({ id: id, updates: { status: "completed" } });
    toast.success("Task marked as completed");
  };

  const handleDeleteTask = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `https://kiln-task-backend.vercel.app/api/v1/tasks/${id}`
          );

          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Task has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the task.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the task.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr key={task._id}>
      <td>{task.name}</td>
      <td>{task.title}</td>
      <td>{task.priority}</td>
      <td>{task.dueDate}</td>
      <td>{task.status}</td>
      <td className="flex gap-4">
        <TaskModal task={task}></TaskModal>
        <button onClick={() => handleDeleteTask(task._id)}>
          <RiDeleteBin5Fill className="text-xl text-red-600"></RiDeleteBin5Fill>
        </button>
        {task.status == "pending" ? (
          <button
            className="bg-green-400 rounded-sm text-white font-medium p-2"
            onClick={() => handleStatusChange(task._id)}
          >
            Mark As Completed
          </button>
        ) : (
          <IoMdCheckmark className="text-xl text-green-500 " />
        )}
      </td>
    </tr>
  );
};

export default SingleTask;

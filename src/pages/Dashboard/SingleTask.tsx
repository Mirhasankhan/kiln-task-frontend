import { RiDeleteBin5Fill } from "react-icons/ri";
import TaskModal from "./TaskModal";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/features/task/taskManagement.api";
import Swal from "sweetalert2";
import { IoMdCheckmark } from "react-icons/io";
import { TTask } from "./ManageTask";
import { toast } from "sonner";

const SingleTask = ({ task }: { task: TTask }) => {
  const [deleteTask] = useDeleteTaskMutation();
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
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
        Swal.fire({
          title: "Deleted!",
          text: "Task has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <tr key={task._id}>
      <td>{task.name}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
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

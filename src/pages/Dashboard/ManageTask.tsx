import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import {
  useDeleteTaskMutation,
  useTasksQuery,
  useUpdateTaskMutation,
} from "../../redux/features/task/taskManagement.api";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { Select } from "antd";
import Swal from "sweetalert2";

export type TTask = {
  dueDate: string;
  _id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  status: string;
};

const ManageTask = () => {
  const [searched, setSearched] = useState("");
  const [status, setStatus] = useState("");
  const handleChange = (value: string) => {
    setStatus(`${value}`);
  };

  const { data: tasks } = useTasksQuery({
    search: searched,
    status: status,
  });

  const [deleteTask] = useDeleteTaskMutation();
  const [changeStatus] = useUpdateTaskMutation();

  const handleStatusChange = (id: string) => {
    changeStatus({ id: id, updates: { status: "completed" } });
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
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium pb-4">Task Table</h1>
        <div className="flex gap-2 items-center">
          <input
            onChange={(e) => setSearched(e.target.value)}
            type="text"
            className="border p-1 rounded-lg"
            placeholder="search keywords"
          />
          <Select
            onChange={handleChange}
            defaultValue="All"
            style={{ width: 120 }}
            options={[
              { value: "", label: "All" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
            ]}
          />
        </div>
      </div>
      <div className="overflow-x-auto table-zebra bg-white p-2">
        <table className="table">
          <thead className="bg-blue-500 text-white font-medium">
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Descripton</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task: TTask) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTask;

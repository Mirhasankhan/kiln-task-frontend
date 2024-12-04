import { useTasksQuery } from "../../redux/features/task/taskManagement.api";
import { useState } from "react";
import { Select } from "antd";
import SingleTask from "./SingleTask";

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

  const { data: tasks, isLoading } = useTasksQuery({
    search: searched,
    status: status,
  });
  if (isLoading) {
    return <p className="text-3xl text-center pt-24">Loading..........</p>;
  }

  return (
    <div>
      <div className="md:flex mb-4 justify-between items-center">
        <h1 className="text-3xl font-medium">Task Table</h1>
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
      {tasks?.length > 0 ? (
        <div className="overflow-x-auto table-zebra bg-white p-2">
          <table className="table">
            <thead className="bg-blue-500 text-white font-medium">
              <tr>
                <th>User Name</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task: TTask) => (
                <SingleTask task={task} key={task._id}></SingleTask>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-3xl pt-8 text-red-500">
          No task found for this search!!!
        </h1>
      )}
    </div>
  );
};

export default ManageTask;

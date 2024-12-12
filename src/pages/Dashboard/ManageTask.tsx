import { useEffect, useState } from "react";
import { Select, Table } from "antd";
import { TTask } from "../../types/Sidebar.type";
import { columns } from "../../utils/TableColumns";
import useFetchTasks from "../../hooks/useFetchTasks";

const ManageTask = () => {
  const [search, setSearched] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const getTask = useFetchTasks();
  const handleChange = (value: string) => {
    setStatus(`${value}`);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTask(search, status);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [status, search]);

  const tableData = tasks?.map(
    ({ _id, title, priority, status, dueDate }: TTask) => ({
      _id,
      title,
      priority,
      dueDate,
      status,
    })
  );

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
              { value: "Completed", label: "Completed" },
              { value: "", label: "Not Completed" },
            ]}
          />
        </div>
      </div>
      <div>
        {tasks?.length > 0 ? (
          <Table
            pagination={{ pageSize: 5 }}
            loading={tasks.length > 0 ? false : true}
            dataSource={tableData}
            columns={columns}
          />
        ) : (
          <p className="text-red-500 text-center pt-12 text-4xl">
            No Task Found
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageTask;

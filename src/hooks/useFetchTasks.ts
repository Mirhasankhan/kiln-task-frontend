import axios from "axios";

const useFetchTasks = () => {
  const getTask = async (search: string, status: string) => {
    try {
      const response = await axios.get(
        "https://kiln-task-backend.vercel.app/api/v1/tasks",
        {
          params: { search, status },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);
      throw new Error("Failed to fetch data");
    }
  };

  return getTask;
};

export default useFetchTasks;

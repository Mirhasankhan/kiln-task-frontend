import TaskForm from "../../components/layout/TaskForm";
import { Moment } from "moment";

export interface FormData {
  username: string;
  priority: string;
  status: boolean;
  title: string;
  dob: Moment;
}

const AddTask = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold pb-6 text-center">
        Create New Task
      </h1>
      <TaskForm></TaskForm>
    </div>
  );
};

export default AddTask;

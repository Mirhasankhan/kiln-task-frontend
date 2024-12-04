import { useState } from "react";
import { DatePicker, DatePickerProps, Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { TTask } from "./ManageTask";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormData } from "./AddTask";
import { useUpdateTaskMutation } from "../../redux/features/task/taskManagement.api";

const TaskModal = ({ task }: { task: TTask }) => {
  const [date, setDate] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask] = useUpdateTaskMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(dateString);
    console.log(date);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (date) {
      const newTask = {
        ...data,
        dueDate: date,
      };
      editTask({ id: task._id, updates: newTask });
      toast.success("Task Edited");
      setIsModalOpen(false);
    } else {
      toast.error("select a date");
    }
  };

  return (
    <>
      <button onClick={showModal}>
        <FaEdit className="text-xl text-green-500"></FaEdit>
      </button>
      <Modal
        title="Edit Your Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="border p-4 rounded-md border-blue-500">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Task Title</label>
                <input
                  defaultValue={task.title}
                  type="text"
                  {...register("title", {
                    required: "title is required",
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter task title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">
                    {errors.title.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Due Date</label>
                <DatePicker className="w-full" onChange={onChange} />
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                defaultValue={task.description}
                {...register("description", {
                  required: "description is required",
                })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter task description"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message as string}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 font-semibold text-white py-2 rounded hover:bg-blue-600"
            >
              Update Task
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TaskModal;

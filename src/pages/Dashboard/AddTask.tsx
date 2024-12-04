import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateTaskMutation } from "../../redux/features/task/taskManagement.api";
import { DatePicker, DatePickerProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

export interface FormData {
  name: string;
  email: string;
  description: string;
  title: string;
}

const AddTask = () => {
  const [date, setDate] = useState<any>("");
  const [createNewTask] = useCreateTaskMutation();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(dateString);
    console.log(date, dateString);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (date) {
      const newTask = {
        ...data,
        dueDate: date,
        status: "pending",
      };
      createNewTask(newTask);
      toast.success("Task created successfully");
      reset();
    } else {
      toast.error("Please Select a date");
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold pb-6 text-center">
        Create New Task
      </h1>
      <div className="border p-4 rounded-md border-blue-500">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                defaultValue={name ?? ""}
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Task Title</label>
              <input
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
              <DatePicker className="w-full py-2" onChange={onChange} />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("description", {
                required: "description number is required",
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
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

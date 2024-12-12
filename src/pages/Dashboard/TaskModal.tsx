import { useState } from "react";
import { DatePicker, Modal, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import { TTask } from "../../types/Sidebar.type";
import { Form, Input, Button, notification, Switch } from "antd";
import { FormData } from "./AddTask";
import axios from "axios";

const { Option } = Select;

const TaskModal = ({ task }: { task: TTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: FormData) => {
    const updatedTask = {
      title: values.title,
      priority: values.priority,
      dueDate: values.dob.format("DD-MM-YYYY"),
      status: values.status == true ? "Completed" : "Not completed",
    };
    try {
      const response = await axios.put(
        `https://kiln-task-backend.vercel.app/api/v1/tasks/${task._id}`,
        { updates: updatedTask }
      );
      notification.success({
        message: "Success",
        description: "Task Edited!",
      });
      setIsModalOpen(false);
      return response.data;
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Task Editing Failed!",
      });
      throw err;
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
        <Form
          className="border-2 rounded-md p-3"
          name="basic"
          initialValues={{
            title: task.title,
            priority: task.priority,
            status: task.status,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <div className="flex gap-6">
            <Form.Item
              className="w-full"
              label="Task Title"
              name="title"
              rules={[
                { required: true, message: "Please input your task title!" },
              ]}
            >
              <Input placeholder="task title" />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Due Date"
              name="dob"
              rules={[{ required: true, message: "Please select due date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <div className="flex gap-6">
            <Form.Item
              className="w-full"
              label="Priority"
              name="priority"
              rules={[
                { required: true, message: "Please select task priority" },
              ]}
            >
              <Select placeholder="Select priority">
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Status"
              name="status"
              valuePropName={task.status == "Completed" ? "checked" : ""}
            >
              <Switch
                checkedChildren="Completed"
                unCheckedChildren="Not Completed"
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              className="w-full font-medium"
              type="primary"
              htmlType="submit"
            >
              Update Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskModal;

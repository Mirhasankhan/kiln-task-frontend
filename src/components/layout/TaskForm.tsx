import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification,
  Switch,
} from "antd";
import axios from "axios";
import { FormData } from "../../pages/Dashboard/AddTask";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

const TaskForm = () => {
  const [form] = useForm();
  const onFinish = async (values: FormData) => {
    const newTask = {
      title: values.title,
      name: values.username,
      priority: values.priority,
      dueDate: values.dob.format("DD-MM-YYYY"),
      status: values.status == true ? "Completed" : "Not completed",
    };
    try {
      const response = await axios.post(
        "https://kiln-task-backend.vercel.app/api/v1/addTask",
        newTask
      );

      if (response.status === 201) {
        notification.success({
          message: "Success",
          description: "Task Created successfully!",
        });
        form.resetFields();
      } else {
        notification.error({
          message: "Failed",
          description: "Failed To Create Task!",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "An error occurred while creating the task",
      });
    }
  };

  return (
    <Form
      form={form}
      className="border-2 border-blue-500 rounded-md px-3 pt-3"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <div className="flex gap-6">
        <Form.Item
          className="w-full"
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="User Name" />
        </Form.Item>
        <Form.Item
          className="w-full"
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="enter email address" />
        </Form.Item>
      </div>
      <div className="flex gap-6">
        <Form.Item
          className="w-full"
          label="Task Title"
          name="title"
          rules={[{ required: true, message: "Please input your task title!" }]}
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
          rules={[{ required: true, message: "Please select task priority" }]}
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
          valuePropName="checked"
        >
          <Switch
            checkedChildren="Completed"
            unCheckedChildren="Not Completed"
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Button className="w-full font-medium" type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;

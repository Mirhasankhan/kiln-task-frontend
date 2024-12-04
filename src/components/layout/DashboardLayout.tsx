import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout>
      <Sidebar></Sidebar>
      <Layout>
        <DashboardHeader></DashboardHeader>
        <Content style={{ margin: "12px 8px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 650,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

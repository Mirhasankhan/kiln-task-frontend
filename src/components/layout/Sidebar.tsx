import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { sidebarItemsGenerator } from "../../utils/SidebarItemsGenerator";
import { userPaths } from "../../routes/user.routes";

const { Sider } = Layout;

const Sidebar = () => {
  //   let sidebarItems;
  const sidebarItems = sidebarItemsGenerator(userPaths);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
      style={{
        backgroundColor: "blue",
        // overflow: "hidden",
      }}
    >
      <div
        style={{
          color: "black",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          borderRight: "0.2px dotted lightgray",
        }}
      >
        <Link to="/" className="flex items-center justify-center">
          <h1
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="font-bold text-white pl-4"
          >
            Brand Kiln Task
          </h1>
        </Link>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
        style={{
          backgroundColor: "blue",
          fontSize: "16px",
        }}
      />
    </Sider>
  );
};

export default Sidebar;

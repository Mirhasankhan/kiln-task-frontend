import { Layout, Menu } from "antd";

import { Link } from "react-router-dom";
import logo from "../../assets/tree-plantation.jpg";
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
        backgroundColor: "white",
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
          border: "0.2px dotted lightgray",
        }}
      >
        <Link to="/" className="flex items-center">
          <img className="h-10 w-10 rounded-full" src={logo} alt="" />
          <h1
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="font-bold"
          >
            InfiniteMart
          </h1>
        </Link>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
        style={{
          backgroundColor: "white",
        }}
      />
    </Sider>
  );
};

export default Sidebar;

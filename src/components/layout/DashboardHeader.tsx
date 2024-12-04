import { IoChatbubblesOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import profileImage from "../../assets/tree-plantation.jpg";

const { Header } = Layout;

const DashboardHeader = () => {
  return (
    <Header
      style={{
        padding: 0,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // overflow: "hidden",
      }}
    >
      <div>
        <h1 className="font-medium text-white">Welcome</h1>
      </div>
      <div className="flex md:gap-6 gap-2  text-4xl">
        <CiLight className="border p-2 bg-white rounded-full hover:bg-green-600 cursor-pointer hover:text-white"></CiLight>
        <Link to={"/"}>
          <IoChatbubblesOutline className="border p-2 bg-white rounded-full hover:bg-green-600 cursor-pointer hover:text-white"></IoChatbubblesOutline>
        </Link>
      </div>
      <div>
        <div className="cursor-pointer">
          <img
            className="w-12 h-12 border p-0.5 bg-white rounded-full"
            src={profileImage}
            alt=""
          />
        </div>
      </div>
    </Header>
  );
};

export default DashboardHeader;

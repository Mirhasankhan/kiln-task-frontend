import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoChatbubblesOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import profileImage from "../../assets/tree-plantation.jpg";

const { Header } = Layout;

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);

  // const profileImage = userData?.data?.image
  //   ? userData?.data?.image.imageUrl
  //   : profile;
  return (
    <Header
      style={{
        padding: 0,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // overflow: "hidden",
      }}
    >
      <div>
        <h1 className="font-medium">Welcome</h1>
      </div>
      <div className="flex md:gap-6 gap-2  text-4xl">
        <CiLight className="border p-2 bg-gray-300 rounded-full hover:bg-green-600 cursor-pointer hover:text-white"></CiLight>
        <Link to={"/"}>
          <IoChatbubblesOutline className="border p-2 bg-gray-300 rounded-full hover:bg-green-600 cursor-pointer hover:text-white"></IoChatbubblesOutline>
        </Link>
      </div>
      <div>
        <div className=" w-full flex items-center text-white">
          <div className="relative cursor-pointer text-black flex items-center gap-1">
            <img
              onClick={() => setOpen(!open)}
              className="w-12 h-12 border p-1 rounded-full"
              src={profileImage}
              alt=""
            />
            {open && (
              <div className="absolute w-40 top-14 bg-white shadow-xl rounded-b-md right-0 px-2">
                <Link
                  to={"/"}
                  className="flex gap-2 items-center text-gray-700  cursor-pointer"
                >
                  <CiUser className="text-2xl"></CiUser>
                  <h1 className=" hover:underline">My Profile</h1>
                </Link>
                {/* <div
                  onClick={() => {
                    dispatch(logOut());
                    setOpen(false);
                  }}
                  className="flex gap-2 items-center text-gray-700 hover:text-blue-400 cursor-pointer"
                >
                  <CiLogout className="text-2xl" />
                  <button className=" hover:underline">Logout</button>
                </div> */}
                <h1>logut</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </Header>
  );
};

export default DashboardHeader;

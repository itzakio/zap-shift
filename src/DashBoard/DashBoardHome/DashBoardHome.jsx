import React from "react";
import useRole from "../../hook/useRole";
import AdminDashBoardHome from "./AdminDashBoardHome";
import RiderDashBoardHome from "./RiderDashBoardHome";
import UserDashBoardHome from "./UserDashBoardHome";
import Loader from "../../components/Loader";

const DashBoardHome = () => {
  const { role, roleLoading } = useRole();
  console.log(role);
  if (roleLoading) {
    return <Loader />;
  }
  if (role?.role === "admin") {
    return <AdminDashBoardHome />;
  } else if (role?.role === "rider") {
    return <RiderDashBoardHome />;
  } else {
    return <UserDashBoardHome />;
  }
};

export default DashBoardHome;

import React from "react";
import useAuth from "../../hook/useAuth";

const LogOut = ({ children }) => {
  const { logOutUser } = useAuth();
  const logOutHandler = () => {
    logOutUser()
    .then(() =>{
       console.log("user log out successfully")
    })
    .catch(error =>{
        console.log(error)
    })
  };
  return <div onClick={logOutHandler}>{children}</div>;
};

export default LogOut;

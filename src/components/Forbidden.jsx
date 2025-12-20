import React from "react";
import adminOnly from "../assets/admin-only.gif";
import { Link } from "react-router";
import { MdArrowBack } from "react-icons/md";

const Forbidden = () => {
  return (
    <div className="space-y-4 flex flex-col justify-center items-center min-h-screen bg-base-100">
      <img className="w-40" src={adminOnly} alt="paymentCancelled" />
      <h2 className="text-3xl font-extrabold text-center">
        You Are Forbidden to Access this Page!
      </h2>
      <p className="text-accent">
        Please contact the administrator if you believe this is an error
      </p>
      <div className="space-x-4">
        <Link className="btn btn-primary text-black" to="/">
          Go to Home
        </Link>
        <Link className="btn btn-secondary " to="/dashboard">
          <MdArrowBack />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;

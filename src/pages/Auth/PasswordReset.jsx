import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hook/useAuth';

const PasswordReset = () => {
    const {register,handleSubmit, formState:{errors}} = useForm();
    const {resetPassword} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email] = useState(location?.state || "")
    const [send, setSend] = useState(false)

    const resetPasswordHandler = (data) =>{
      resetPassword(data.email)
      .then(()=>{
        setSend(true)
        console.log("reset email send")
        navigate("/login")
      })
      .catch(error=>{
        console.log(error)
      })
      
    } 
    return (
         <div className=" card w-full margin-y max-w-sm shrink-0 mx-auto">
      <div className="card-body">
        <form onSubmit={handleSubmit(resetPasswordHandler)}>
          <h3 className="text-4xl font-extrabold mb-2">Forgot Password</h3>
          <p className="text-lg mb-4">Enter your email address and we’ll send you a reset link.</p>
          <fieldset className="fieldset">
            {/* email */}
            <label className="text-base label font-semibold">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full text-base placeholder:text-accent"
              placeholder="Enter Your Email"
              defaultValue={email}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
           
            
            <div className="flex flex-col items-center mt-4">
                 <button
              disabled={send}
              type="submit"
              className={`  btn bg-primary w-full transition-all duration-100  ${
                send
                  ? "bg-gray-200 text-gray-500 px-4 py-2 text-lg font-semibold cursor-not-allowed"
                  : ""
              }`}
            >
              {send ? "Email Send" : `Send`}
            </button>
            </div>
          </fieldset>
        </form>
        
        <p className="mt-2 text-center text-base">
          Remember your password?{" "}
          <Link
            state={location.state}
            to="/login"
            className="hover:underline font-semibold "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
    );
};

export default PasswordReset;
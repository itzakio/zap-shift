import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Login = () => {
  const [show, setShow] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { logInUser, googleSignIn } = useAuth();

  const loginHandler = (data) => {
    console.log(data);
    logInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignInHandler = () => {
    console.log("google login clicked");
    googleSignIn()
      .then((result) => {
        console.log(result.user);

        // create user in database
        const user_info = {
          email: result.user.email,
          name: result.user.displayName,
          photo_url: result.user.photoURL,
        };
        axiosSecure.post("/users", user_info).then((res) => {
          if (res.data.insertedId) {
            console.log("user created in database");
          }
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" card w-full margin-y max-w-sm shrink-0 mx-auto">
      <div className="card-body">
        <form onSubmit={handleSubmit(loginHandler)}>
          <h3 className="text-4xl font-extrabold mb-2">Welcome Back</h3>
          <p className="text-lg mb-4">Login with ZapShift</p>
          <fieldset className="fieldset">
            {/* email */}
            <label className="text-base label font-semibold">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full text-base placeholder:text-accent"
              placeholder="Enter Your Email"
              onChange={(e) => setEmailValue(e.target.value)}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {/* password */}
            <label className="label text-base font-semibold">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must contain at least one uppercase, one lowercase,one number & one special character",
                  },
                })}
                type={show ? "text" : "password"}
                className="input w-full placeholder:text-accent text-base transition-all duration-200"
                placeholder="Enter Your Password"
              />
              <p
                onClick={() => setShow(!show)}
                className="absolute right-4 top-2.5 z-99"
              >
                {show ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </p>
            </div>
            {errors?.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="mt-2 text-base">
              <Link state={emailValue} to="/reset-password">
                Forgot password?
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <button type="submit" className="btn bg-primary w-full">
                Login
              </button>
            </div>
          </fieldset>
        </form>
        <p className="text-center text-base">or</p>
        <div className="flex flex-col items-center">
          <button
            onClick={googleSignInHandler}
            className="flex items-center justify-center gap-1 cursor-pointer active:scale-98  w-full btn bg-gray-200"
          >
            <FcGoogle size={16} /> <span>Login with Google</span>
          </button>
        </div>
        <p className="mt-2 text-center text-base">
          Don't have an account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="hover:underline font-semibold "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

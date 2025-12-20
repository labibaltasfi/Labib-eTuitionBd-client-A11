import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {signIn} = useAuth();
   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signIn(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
               
            })

  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <title>Login</title>

      <div className="card bg-white text-gray-800 py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-3xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">
          Login to your account
        </h2>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4 sm:space-y-6 lg:space-y-8"
        >
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="p-3 sm:p-4 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="p-3 sm:p-4 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgetPassword"
              className="text-[#192489] hover:underline text-sm"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 sm:py-4 rounded-xl bg-[#192489] text-white font-semibold hover:bg-[#141d6f] transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <SocialLogin></SocialLogin>

        {/* Register link */}
        <p className="pt-4 sm:pt-6 text-center text-gray-600">
          Don’t have an account?
          <Link
            to="/register"
            className="text-[#192489] font-semibold hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

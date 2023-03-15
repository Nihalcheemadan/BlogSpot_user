import { EyeIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../helpers/helper";
import { loginformValidate } from "../helpers/validate";
import { authenticate } from "../redux/slices/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginformValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // let checking = toast.loading('Checking...')
      let loginPromise = login({
        username: values.username,
        password: values.password,
      });
      toast
        .promise(loginPromise, {
          loading: "Checking...",
          success: <b>Login Successfully...!</b>,
        })
        .then((res) => {
          console.log(res);
          let { token } = res.data;
          localStorage.setItem("token", token);
          dispatch(authenticate());
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss();
          toast.error(error?.response?.data?.error);
        });
    },
  });

  return (
    <div
      class="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/768472/pexels-photo-768472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
    >
      <div class="hidden sm:block absolute bg-green-500/20 inset-0 z-0 "></div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div class="self-start hidden lg:flex flex-col  text-white">
            <img src="" class="mb-3" />
            <h1 class="mb-3 font-bold text-5xl">Welcome to our blog! </h1>
            <p class="pr-3">
              Please enter your login information to access exclusive content
              and join our community of like-minded individuals. If you don't
              have an account yet, please sign up and become part of our growing
              community of writers and readers. We look forward to sharing our
              thoughts and experiences with you, and hearing your unique
              perspective on the world. Thank you for being a part of our
              community!
            </p>
          </div>
        </div>
        <div class="flex justify-center self-center   z-10">
          <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p class="text-gray-500">Please sign in to your account.</p>
            </div>
            <form class="space-y-5" onSubmit={formik.handleSubmit}>
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 tracking-wide">
                  Username
                </label>
                <input
                  class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="text"
                  {...formik.getFieldProps("username")}
                  placeholder="Enter your username"
                />
              </div>
              <div class="relative">
                <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  class="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type={isPasswordVisible ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 top-3 bottom-0 h-full px-2"
                >
                  <EyeIcon
                    className={`w-6 h-6 text-gray-400 ${
                      isPasswordVisible ? "opacity-50" : ""
                    }`}
                  />
                </button>
              </div>
              <div class="flex items-center justify-between">
                {/* <div class="text-sm">
                  <a href="#" class="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div> */}
                <div class="text-sm">
                  <p class="text-gray-600">
                    Don't have an account?
                    <a href="/register" class="text-green-400 hover:text-green-500">
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

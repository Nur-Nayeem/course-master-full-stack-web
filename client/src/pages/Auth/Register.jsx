import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { login, setLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/auth/register", data);

      login(res.data.user, res.data.token);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Resigter successfull! Check Your mail",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Registration failed",
        icon: "error",
        confirmButtonText: "Cool",
      });
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/auth/google", {
        credential: credentialResponse.credential,
      });

      login(res.data.user, res.data.token);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Google login successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoading(false);
      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Google login failed",
        icon: "error",
        confirmButtonText: "Cool",
      });
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    Swal.fire({
      title: "Error!",
      text: "Google login failed",
      icon: "error",
      confirmButtonText: "Cool",
    });
  };

  return (
    <div className="flex h-full grow flex-col py-16">
      <title>Course Master- Register</title>
      <div className="flex flex-1 items-center justify-center p-4 lg:p-8">
        <div className="flex w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="hidden w-1/2 lg:flex items-center justify-center p-12">
            <img
              src="/books.png"
              alt="Books"
              className="w-full h-full rounded-xl"
            />
          </div>

          <div className="w-full lg:w-1/2 p-8 sm:p-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-secondary text-center">
                Create Account
              </h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 flex flex-col gap-6"
              >
                {/* Name */}
                <div>
                  <p className="text-sm font-medium pb-2">Name</p>
                  <div className="relative">
                    <BsPerson className="absolute left-3 top-3 text-gray-500" />
                    <input
                      {...register("name", { required: "Name required" })}
                      placeholder="Your Name"
                      className="w-full pl-10 py-3 border rounded-lg"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <p className="text-sm font-medium pb-2">Email</p>
                  <div className="relative">
                    <MdOutlineEmail className="absolute left-3 top-3 text-gray-500" />
                    <input
                      {...register("email", { required: "Email required" })}
                      type="email"
                      placeholder="you@gmail.com"
                      className="w-full pl-10 py-3 border rounded-lg"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <p className="text-sm font-medium pb-2">Password</p>
                  <div className="relative">
                    <BiLock className="absolute left-3 top-3 text-gray-500" />
                    <input
                      {...register("password", {
                        required: "Password required",
                      })}
                      type={showPass ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-10 py-3 border rounded-lg"
                    />

                    <span
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
                    >
                      {showPass ? <IoEyeOff /> : <IoEye />}
                    </span>

                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <button className="bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90">
                  Register
                </button>
              </form>

              <div className="flex items-center gap-3 my-4">
                <hr className="flex-1" />
                <span className="text-gray-400">OR</span>
                <hr className="flex-1" />
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>
              <p className="text-center mt-4 text-sm">
                Already have an account?
                <Link to="/login" className="text-primary ml-1 font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

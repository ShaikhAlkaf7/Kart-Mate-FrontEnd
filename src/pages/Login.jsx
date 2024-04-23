import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { addUser } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (data.success == true) {
        // we are settign the token in to local storege
        const addUserInLocal = {
          user: data?.user,
          token: data?.token,
        };
        localStorage.setItem("userAuthToken", JSON.stringify(addUserInLocal));
        const user = localStorage.getItem("userAuthToken");
        dispatch(addUser(JSON.parse(user)));
        toast.success(data?.message, {
          position: "top-center",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  return (
    <form
      className="flex flex-col max-w-96  justify-center items-center sm:m-auto  gap-5 px-5 mx-auto py-20"
      onSubmit={loginHandler}
    >
      <h1 className="uppercase font-semibold text-2xl text-center">Login</h1>
      <input
        type="email"
        placeholder=" Enter Your Email"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="w-full flex items-center border  p-2 border-gray-400 outline-none rounded-md">
        <input
          type={showPassword}
          placeholder=" Enter Your Password"
          className="w-full outline-none"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showPassword === "text" ? (
          <FaRegEyeSlash
            onClick={() => setShowPassword("password")}
            className="cursor-pointer"
          />
        ) : (
          <FaRegEye
            onClick={() => setShowPassword("text")}
            className="cursor-pointer"
          />
        )}
      </div>
      <button
        type="submit"
        className="hover:bg-[#39A7FF] bg-[#87C4FF] w-full rounded-md py-2 font-semibold transition-all duration-100 text-xl"
        onClick={loginHandler}
      >
        Login
      </button>
      <div className="text-left w-full italic font-semibold">
        New to Kart-Mate{" "}
        <Link to={"/sign-up"} className="text-red-700">
          Sign-Up
        </Link>
      </div>
    </form>
  );
};

export default Login;

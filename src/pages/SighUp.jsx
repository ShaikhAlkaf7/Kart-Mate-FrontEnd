import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const SighUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_ROUTE}/api/user/signup`,
        {
          name,
          email,
          password,
          dob: DOB,
          phoneNumber,
        }
      );
      if (data?.success == true) {
        navigate("/login");
        toast.success("Sign Up success", { position: "top-center" });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  return (
    <form
      className="flex flex-col max-w-96  justify-center items-center sm:m-auto  gap-5 px-5 mx-auto py-20"
      onSubmit={signupHandler}
    >
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="uppercase font-semibold text-2xl text-center">Sign-up</h1>
      <input
        type="text"
        placeholder=" Enter Your Name"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder=" Enter Your Email"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="date"
        placeholder=" Enter Your DOB"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required
        value={DOB}
        onChange={(e) => setDOB(e.target.value)}
      />
      <input
        type="number"
        placeholder=" Enter Your Mobile Number"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
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
        onSubmit={signupHandler}
        type="submit"
        className="hover:bg-[#39A7FF] bg-[#87C4FF] w-full rounded-md py-2 font-semibold transition-all duration-100 text-xl"
      >
        Sign-Up
      </button>
      <div className="text-left w-full italic font-semibold">
        Already sign-up to Kart-Mate{" "}
        <Link to={"/login"} className="text-red-700">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SighUp;

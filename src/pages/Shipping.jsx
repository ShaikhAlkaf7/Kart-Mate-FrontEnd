import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { shippingInfo } from "../redux/reducer/cartReducer";
import { Helmet } from "react-helmet";

const Shipping = () => {
  const { cartItem, total } = useSelector((state) => state?.cartReducer);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState();
  const [phone, setPhone] = useState();
  const navigate = useNavigate();
  const dispacth = useDispatch();

  useEffect(() => {
    if (cartItem.length <= 0) return navigate("/cart");
  }, [cartItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispacth(
      shippingInfo({ address, city, state, country, pincode: pinCode, phone })
    );
    console.log(phone);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_ROUTE}/api/payment/create`,
        {
          amount: total,
        }
      );
      navigate("/pay", { state: data.clientSecret });
    } catch (error) {
      toast.error("something went wrong ", { position: "top-center" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-96  justify-center items-center sm:m-auto  gap-5 px-5 mx-auto  pt-10"
    >
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <h1 className="uppercase font-semibold text-2xl text-center">
        shipping Address
      </h1>
      <input
        type="text"
        placeholder="Address"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required={true}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required={true}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="State"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required={true}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <select
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required={true}
        onChange={(e) => setCountry(e.target.value)}
        value={country}
      >
        <option value="">Chose Country</option>
        <option value="india">India</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
      </select>
      <input
        type="number"
        placeholder="Pin Code"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required={true}
        value={pinCode}
        onChange={(e) => setPinCode(e.target.value)}
      />
      <input
        type="number"
        placeholder="phone Number"
        className="border w-full p-2 border-gray-400 outline-none rounded-md"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        type="submit"
        className="hover:bg-[#39A7FF] bg-[#87C4FF] w-full rounded-md py-2 font-semibold transition-all duration-100"
      >
        Pay Now
      </button>
      <button
        type="submit"
        className="bg-red-500  hover:bg-red-600  w-full rounded-md py-2 font-semibold transition-all duration-100 flex items-center justify-center gap-2"
        onClick={() => navigate("/cart")}
      >
        <FaArrowLeft /> Back to Cart
      </button>
    </form>
  );
};

export default Shipping;

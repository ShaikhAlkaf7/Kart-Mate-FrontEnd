import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { user } = useSelector((state) => state?.userReducer);
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders", {
        headers: {
          Authorization: user?.token,
        },
      });
      setOrders(data.orders);
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <div className="pt-16 mx-2 md:mx-[10%]">
      <h1 className="uppercase text-2xl">my orders</h1>
      <div className="my-5 sm:px-5 ">
        <h1 className="uppercase text-xl text-center my-5">Orders</h1>
        {orders.map((item) => (
          <div className="flex items-center sm:py-2  justify-between border rounded-md px-1 sm:px-5 text-sm sm:text-base ">
            {/* <img
              src={item.orderItems.}
              alt={item}
              className="h-20 sm:w-32 w-10 object-contain"
            /> */}
            <p className="font-semibold">{item.orderItems[0].name} </p>
            <p className="text-red-700 font-semibold">{item.status}</p>
            <p className="font-semibold">{item.total}</p>
            <button className="bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-700">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

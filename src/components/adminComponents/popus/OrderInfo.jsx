import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  setPopupFalse,
  setPopupTrue,
} from "../../../redux/reducer/popupReducer";
const OrderInfo = ({ orderId }) => {
  const [orderDeatail, setOrderDeatail] = useState();
  const [status, setStatus] = useState();
  const { user } = useSelector((state) => state?.userReducer);
  const dispatch = useDispatch();

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`/api/order/${orderId}`, {
        headers: {
          Authorization: user?.token,
        },
      });
      setOrderDeatail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async (e) => {
    e.preventDefault();
    dispatch(setPopupTrue());
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_ROUTE}/api/order/${orderId}`,
        { status },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      toast.success(data.message, { position: "top-center" });
      dispatch(setPopupFalse());
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  const orderDeleteHandler = async () => {
    try {
      dispatch(setPopupTrue());

      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_ROUTE}/api/order/${orderId}`,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      toast.success(data.message, { position: "top-center" });
      dispatch(setPopupFalse());
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="flex    gap-2 bg-[#AED2FF] md:w-[60%] w-[90%] flex-col overflow-auto items-stretch h-[90vh]  md:flex-row m-auto my-4 md:p-8 p-2 rounded-lg shadow-2xl shadow-black ">
      <div className="bg-white flex justify-center  md:w-[45%] w-full items-start rounded-md">
        {orderDeatail?.order?.orderItems?.map((item) => (
          <div className="flex flex-row items-center font-semibold text-sm w-full justify-start my-2 ">
            <img
              src={item.photo}
              alt={item.name}
              className="h-20 w-32 object-contain rounded-md"
            />
            <p>{item.name}</p>{" "}
            <p>
              {item?.quantity} X {item?.price} = {item?.quantity * item?.price}
            </p>
          </div>
        ))}
      </div>
      <section className="  max-w-[400px] m-auto flex flex-col  md:w-[45%] w-full  gap-4 bg-[#27005d] text-white  p-8 rounded-lg shadow-2xl shadow-black ">
        <h2 className="uppercase text-2xl text-center font-semibold ">
          order info
        </h2>
        <div>
          <div className="py-2">
            <h3 className="font-semibold text-lg">Custumer</h3>
            <p className="text-sm opacity-90">
              Name: {orderDeatail?.order?.user?.name}
            </p>
            <p className="text-sm opacity-90">
              Address : {orderDeatail?.order?.shippingInfo.address}
            </p>
          </div>

          <div className="py-2">
            <h3 className="font-semibold text-lg">Amout Info</h3>
            <p className="text-sm opacity-90">
              Subtotal: {orderDeatail?.order?.subtotal}{" "}
            </p>
            <p className="text-sm opacity-90">
              Shipping Carges : {orderDeatail?.order?.shippingCharges}
            </p>
            <p className="text-sm opacity-90">
              Tax: {orderDeatail?.order?.tax}
            </p>
            <p className="text-sm opacity-90">
              Discount: {orderDeatail?.order?.discout}
            </p>
            <p className="text-sm opacity-90">
              Total: {orderDeatail?.order?.total}
            </p>
          </div>

          <div className="py-2">
            <h3 className="font-semibold text-lg">Status</h3>
            <p className="text-sm opacity-90">
              Status : {orderDeatail?.order?.status}{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-between flex-col items-center gap-2">
          <form
            className="flex items-center flex-col gap-2"
            onSubmit={updateOrder}
          >
            <select
              className=" text-black p-2 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">{orderDeatail?.order?.status}</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              type="submit"
              className="bg-[#AED2FF] text-black font-semibold rounded-lg py-2 uppercase text-base w-full"
              onClick={updateOrder}
            >
              Progress
            </button>
          </form>
          <button
            className="bg-[red] text-white font-semibold rounded-lg py-2 uppercase text-base w-full"
            type="button"
            onClick={orderDeleteHandler}
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderInfo;

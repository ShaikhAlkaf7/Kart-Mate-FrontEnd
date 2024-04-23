import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/adminComponents/AdminSideBar";
import OrderInfo from "../../components/adminComponents/popus/OrderInfo";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";

const Transaction = () => {
  const [orderId, setOrderId] = useState();
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state?.userReducer);

  const { value } = useSelector((state) => state?.popup);

  const fetchOrders = async () => {
    const { data } = await axios.get("/api/order/all-orders", {
      headers: {
        Authorization: user?.token,
      },
    });
    console.log(data);
    setData(data.orders);
  };

  const [orderPopup, setOrderPopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowPerPage = 10;

  const indexOfLastRow = currentPage * rowPerPage;
  const indexOfFirstFirst = indexOfLastRow - rowPerPage;
  const currentRows = data.slice(indexOfFirstFirst, indexOfLastRow);

  const totalPage = Math.ceil(data.length / rowPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openOrderDeatail = (id) => {
    setOrderPopup(true);
    setOrderId(id);
  };

  useEffect(() => {
    fetchOrders();
    setOrderPopup(false);
  }, [value]);
  return (
    <div className="grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10  ">
        <AdminSideBar />
      </div>
      <main className=" text-black h-screen lg:col-span-8 col-span-10 bg-[#27005d]  lg:pr-8 px-1  overflow-auto w-full">
        <div className="px-4 bg-[#AED2FF] rounded-lg mb-2 mt-6 ">
          <h2 className="text-center py-4 uppercase font-semibold text-xl  text-black">
            Custumers
          </h2>
          <table className="w-full text-left px-4 text-xs sm:text-base">
            <thead>
              <tr>
                {/* <th className="py-2">Photo</th> */}
                <th>User</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>Quantity</th>
                <th className="hidden sm:block">Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((d) => (
                <tr className="border-b border-gray-600 ">
                  {/* <td className="pt-5">{d.photo}</td> */}
                  <td className="pt-5">{d.user.name}</td>
                  <td className="pt-5">{d.total}</td>
                  <td className="pt-5">{d.discout}</td>
                  <td className="pt-5">{d.orderItems.length}</td>
                  <td className="pt-5 hidden sm:block">{d.status}</td>
                  <td className="pt-5 pb-3">
                    <button
                      onClick={() => openOrderDeatail(d?._id)}
                      className="px-3 py-2 bg-[#40128B] text-white font-semibold rounded-md hover:bg-[#525FE1] hover:text-black "
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full text-center p-2  flex gap-3 justify-center text-white">
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-2  rounded-md ${
                  index + 1 == currentPage
                    ? "bg-white text-black"
                    : "bg-[#27005d]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
      {orderPopup ? (
        <div
          className="h-screen w-screen    backdrop-blur-[2px] absolute "
          // onClick={() => setPopup(false)}
        >
          <RxCross1
            onClick={() => setOrderPopup(false)}
            className="cursor-pointer absolute right-3 top-3 text-white font-bold text-2xl h-10 w-10 "
          />
          <OrderInfo orderId={orderId} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Transaction;

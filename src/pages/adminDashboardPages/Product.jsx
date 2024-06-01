import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/adminComponents/AdminSideBar";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import NewProduct from "../../components/adminComponents/popus/NewProduct";
import ManageProduct from "../../components/adminComponents/popus/ManageProduct";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Product = () => {
  const [data, setData] = useState([]);
  const [updateProduct, setUpdateProduct] = useState();
  const { user } = useSelector((state) => state?.userReducer);
  const { value } = useSelector((state) => state?.popup);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_ROUTE}/api/product/admin-products`,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      setData(data?.products);
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  const [newProductPopup, setNewProductPopup] = useState(false);
  const [productManagePopup, setProductManagePopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowPerPage = 5;

  const indexOfLastRow = currentPage * rowPerPage;
  const indexOfFirstFirst = indexOfLastRow - rowPerPage;
  const currentRows = data.slice(indexOfFirstFirst, indexOfLastRow);
  const totalPage = Math.ceil(data.length / rowPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchProduct();
  }, [value]);

  useEffect(() => {
    setNewProductPopup(value);
    setProductManagePopup(value);
  }, [value]);

  return (
    <div className=" grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen ">
      <Helmet>
        <title>Products</title>
      </Helmet>
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10  ">
        <AdminSideBar />
      </div>
      <main className="text-black h-screen lg:col-span-8 col-span-10 bg-[#27005d]  lg:pr-8 px-4  overflow-auto w-full">
        <div className="px-4 bg-[#AED2FF] rounded-lg mb-2 mt-6">
          {/* heading and button  */}
          <div className="flex items-center  py-4 w-full justify-center   flex-wrap  gap-5 relative">
            <h2 className="text-center  uppercase font-semibold text-xl  text-black">
              Products
            </h2>
            <button
              onClick={() => setNewProductPopup(true)}
              className="px-3 py-1 rounded-md flex items-center  justify-center gap-2   bg-[#27005d] text-white hover:bg-white hover:text-black"
            >
              <span>Create New </span>
              <FaPlus />
            </button>
          </div>
          <table className="w-full text-left px-4 text-sm">
            <thead>
              <tr>
                <th className="py-2">Photo</th>
                <th className="hidden sm:block">Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((d) => (
                <tr className="border-b border-gray-600 " key={d._id}>
                  <td>
                    <img
                      src={d.photo}
                      alt="IMGAGE"
                      className="w-14 h-14 rounded-lg my-2 "
                    />
                  </td>
                  <td className="hidden sm:block">{d.name}</td>
                  <td>{d.price}</td>
                  <td>{d.stock}</td>
                  <td>
                    <button
                      onClick={() => {
                        setProductManagePopup(true), setUpdateProduct(d._id);
                      }}
                      className="px-3 py-2 bg-[#40128B] text-white font-semibold rounded-md hover:bg-[#525FE1] hover:text-black"
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

          {/* <div>Total Pages: {totalPage}</div> */}
        </div>
      </main>
      {newProductPopup ? (
        <div className="h-screen w-screen   backdrop-blur-[2px] absolute ">
          <RxCross1
            onClick={() => setNewProductPopup(false)}
            className="cursor-pointer absolute right-3 top-3 text-white font-bold text-2xl h-10 w-10 "
          />
          <NewProduct />
        </div>
      ) : (
        ""
      )}
      {productManagePopup ? (
        <div className="h-screen w-screen   backdrop-blur-[2px] absolute ">
          <RxCross1
            onClick={() => setProductManagePopup(false)}
            className=" cursor-pointer absolute right-3 top-3 text-white font-bold text-2xl h-10 w-10 "
          />
          <ManageProduct product={updateProduct} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Product;

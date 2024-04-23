import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import {
  setPopupFalse,
  setPopupTrue,
} from "../../../redux/reducer/popupReducer";

const ManageProduct = ({ product }) => {
  // getting the id of product

  const { user } = useSelector((state) => state?.userReducer);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const updateProduct = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      dispatch(setPopupTrue());
      const { data } = await axios.put(
        `/api/product/${product}`,
        {
          name,
          description,
          photo,
          price,
          stock,
          category,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      if (data?.success === true) {
        setName(data?.product?.name);
        setPhoto(data?.product?.photo);
        setPrice(data?.product?.price);
        setStock(data?.product?.stock);
        setCategory(data?.product?.category);
        setDescription(data?.product?.description);
        dispatch(setPopupFalse());
        setLoader(false);
        toast.success("Product updated successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  // getting the product from product via props id
  const getProduct = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`/api/product/${product}`, {
        headers: {
          Authorization: user?.token,
        },
      });
      if (data?.success === true) {
        setName(data?.product?.name);
        setPhoto(data?.product?.photo);
        setPrice(data?.product?.price);
        setStock(data?.product?.stock);
        setCategory(data?.product?.category);
        setDescription(data?.product?.description);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  const deleteProduct = async () => {
    dispatch(setPopupTrue());
    try {
      const { data } = await axios.delete(`/api/product/${product}`, {
        headers: {
          Authorization: user?.token,
        },
      });
      if (data?.success == true) {
        toast.success(data?.message, { position: "top-center" });
        dispatch(setPopupFalse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {loader ? (
        <div className="h-full w-full flex justify-center items-center">
          <HashLoader color="#27005d" size={100} />
        </div>
      ) : null}
      <div className="flex items-center justify-center  h-[90vh] gap-2 bg-[#AED2FF] w-[80%] sm:w-[60%] lg:flex-row flex-col overflow-auto m-auto my-4 p-2 rounded-lg shadow-2xl shadow-black ">
        <div className="bg-white w-full flex  justify-center flex-col lg:mt-0 mt-[100%]    items-center rounded-md">
          <img src={photo} alt="Product Image" className="" />
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg">{name}</h2>

            {stock > 0 ? (
              <span className="text-green-800 font-semibold">Avalable</span>
            ) : (
              <span className="text-red-800 font-semibold">Out of stock</span>
            )}
          </div>
          <p className="font-bold text-xl">${price}</p>
          <p></p>
        </div>
        <form
          className="  max-w-[400px] w-full m-auto flex flex-col p-2  gap-1 bg-[#27005d] text-white  sm:p-8 rounded-lg shadow-2xl shadow-black "
          onSubmit={updateProduct}
        >
          <h2 className="uppercase text-2xl text-center font-semibold ">
            Update Product
          </h2>
          <div className="flex flex-col ">
            <label htmlFor="name">
              Name <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="p-2 border border-black rounded-lg text-black outline-none"
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="category">
              Category <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="category"
              placeholder="Category"
              required
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="p-2 border border-black rounded-lg text-black outline-none"
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="description">
              Description <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="p-2 border border-black rounded-lg text-black outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">
              Price <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              id="price"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="p-2 border border-black rounded-lg text-black outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="stock">
              Stock <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              id="stock"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              className="p-2 border border-black rounded-lg text-black outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="photo">
              Photo <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="photo"
              required
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
              value={photo}
              className="p-2 border border-black rounded-lg text-black outline-none"
            />
          </div>
          <div className="flex justify-between gap-1">
            <button
              type="submit"
              className="bg-[#AED2FF] text-black font-semibold rounded-lg py-2 uppercase text-base w-full"
              onClick={updateProduct}
            >
              Update Product
            </button>
            <button
              className="bg-[red] text-white font-semibold rounded-lg py-2 uppercase text-base w-full"
              type="button"
              onClick={deleteProduct}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageProduct;

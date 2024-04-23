import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  setPopupFalse,
  setPopupTrue,
} from "../../../redux/reducer/popupReducer";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.userReducer);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(setPopupTrue());
      const { data } = await axios.post(
        `/api/product/create-product`,
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
        toast.success("Product created  successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  return (
    <form
      className="  max-w-[400px] w-[90%] m-auto flex flex-col  gap-1 bg-[#27005d] text-white border border-white  sm:p-8 p-2 my-2 rounded-lg shadow-2xl shadow-black "
      onSubmit={handleSubmit}
    >
      <h2 className="uppercase text-2xl text-center font-semibold ">
        Create A New Product
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
          onChange={(e) => setPhoto(e.target.value)}
          value={photo}
          className="p-2 border border-black rounded-lg text-black outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-[#AED2FF] text-black font-semibold rounded-lg py-2 uppercase text-xl w-full"
        onClick={handleSubmit}
      >
        {loader ? (
          <PropagateLoader color="#27005d" className="py-4" />
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
};

export default NewProduct;

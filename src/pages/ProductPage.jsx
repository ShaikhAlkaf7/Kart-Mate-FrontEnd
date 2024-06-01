import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../redux/reducer/cartReducer";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  let quantity = 1;
  const [product, setProduct] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_ROUTE}/api/product/${id}`
    );
    setProduct(data?.product);
  };

  const addToCartHandler = (cartItem) => {
    if (cartItem.stock < 1)
      return toast.error("Out Of Stock", { position: "top-center" });
    dispatch(addToCart({ ...cartItem, quantity }));
    toast.success("product add to cart ", { position: "top-center" });
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className=" m-5 flex flex-col md:flex-row justify-evenly w-[90%] gap-5">
      <Helmet>
        <title>{product?.name}</title>
      </Helmet>
      <div className="md:w-[50%] w-full flex justify-center items-center">
        <img src={product?.photo} alt="" />
      </div>
      <div className="my-5 flex flex-col gap-2 md:w-[50%]">
        <h2 className="font-semibold text-xl">{product?.name}</h2>
        <p className="font-bold opacity-75">{product?.price}</p>
        <FaCartArrowDown
          className="text-xl hover:opacity-70 cursor-pointer"
          onClick={() => addToCartHandler(product)}
        />
        {product?.stock > 0 ? (
          <p className="text-green-600 font-semibold">Avalable</p>
        ) : (
          <p className="text-red-600 font-semibold">Out Of Stock</p>
        )}
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;

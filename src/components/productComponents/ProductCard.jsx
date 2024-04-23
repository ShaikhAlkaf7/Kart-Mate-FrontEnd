import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="w-60 hover:-translate-y-1 group hover:shadow-2xl hover:shadow-black shadow-md  overflow-hidden rounded-md transition-all duration-200  px-4 py-2 my-2 border ">
      <Link to={`/product/${product._id}`}>
        <img
          src={product?.photo}
          alt={product.name}
          className="w-full h-60 object-contain "
        />
        <div className="p-2 font-semibold bg-white group-hover:-translate-y-5 duration-300">
          <p>{product?.name}</p>
          <p>{product?.price}</p>
          <p>{product?.desc}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

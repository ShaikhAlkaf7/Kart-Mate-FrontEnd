import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { Link } from "react-router-dom";

const CartItem = ({
  cartItem,
  increamentHandler,
  dcreamentHandler,
  removeCartItemHandler,
}) => {
  return (
    <div className="flex items-center justify-between sm:px-4 px-1 py-2 ">
      <div className="flex items-center sm:gap-10 gap-5">
        <img
          src={cartItem?.photo}
          alt={cartItem?.name}
          className="w-20 h-14 sm:w-32 sm:h-20 object-cover rounded-md "
        />
        <div className="text-center ">
          <Link
            to={`/product/${cartItem?._id}`}
            className="text-xs sm:text-base"
          >
            {cartItem?.name}
          </Link>
          <div className="font-semibold text-xs sm:text-base">
            {cartItem?.price}
          </div>
        </div>
      </div>
      <div className="flex items-center  sm:gap-10 gap-5">
        <div className="flex items-center gap-2 text-xs sm:text-base">
          <button
            title="increase the item quantiry"
            className="bg-gray-300 p-1 rounded-md"
            onClick={() => increamentHandler(cartItem)}
          >
            <FaPlus />
          </button>
          <span>{cartItem?.quantity}</span>
          <button
            className="bg-gray-300 p-1 rounded-md"
            title="Decrease the item quantiry"
            onClick={() => dcreamentHandler(cartItem)}
          >
            <FaMinus />
          </button>
        </div>
        <button
          className="text-xl"
          title="Remove this fom cart"
          onClick={() => removeCartItemHandler(cartItem._id)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

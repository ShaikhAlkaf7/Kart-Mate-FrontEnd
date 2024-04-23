import React, { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "../components/productComponents/CartItem";
import {
  addToCart,
  calculatePrice,
  discountApply,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.userReducer);

  const { cartItem, subTotal, tax, shippingCharge, discount, total } =
    useSelector((state) => state?.cartReducer);
  const [cupon, setCupon] = useState("");
  const [isValidCuponCode, setIsValidCuponCode] = useState(false);

  const applyCoupon = async () => {
    try {
      const { data } = await axios.get(`api/payment/discount?cupon=${cupon}`, {
        headers: {
          Authorization: user?.token,
        },
      });

      if (data.success == true) {
        setIsValidCuponCode(true);
        dispatch(discountApply(data.discount));
        dispatch(calculatePrice());
      } else {
        setIsValidCuponCode(false);
        dispatch(discountApply(0));
        dispatch(calculatePrice());
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setIsValidCuponCode(false);
      dispatch(discountApply(0));
      dispatch(calculatePrice());
    }
  };

  useEffect(() => {
    applyCoupon();
  }, [cupon]);

  const increamentHandler = (cartItem) => {
    if (cartItem?.quantity >= cartItem?.stock)
      return toast.error("Out of Stocks", { position: "top-center" });
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const dcreamentHandler = (cartItem) => {
    if (cartItem?.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeCartItemHandler = (cartId) => {
    dispatch(removeCartItem(cartId));
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItem]);

  return (
    <div className="flex sm:justify-between  items-center sm:items-stretch flex-col pt-24  sm:flex-row sm:px-10 px-2 gap-5">
      <main className="sm:w-[70%] w-full">
        {cartItem.map((item) => (
          <CartItem
            cartItem={item}
            dcreamentHandler={dcreamentHandler}
            increamentHandler={increamentHandler}
            removeCartItemHandler={removeCartItemHandler}
          />
        ))}
      </main>
      <aside className="sm:w-[20%] w-[90%] sm:fixed top-30 right-20">
        <p>Subtotal:- {subTotal}</p>
        <p>Shipping Chargess:- {shippingCharge}</p>
        <p>
          discount: - <span className="italic text-red-700">{discount}</span>
        </p>
        <p>Tax:- {tax}</p>
        <p className="font-semibold ">Total:- {total}</p>
        <div className="flex flex-col">
          <input
            type="text"
            value={cupon}
            onChange={(e) => setCupon(e.target.value)}
            className="border sm:w-full w-[70%] border-black"
            placeholder=" Cupon code here"
          />
          {cupon &&
            (isValidCuponCode ? (
              <span className=" text-green-600">
                -{discount} off using {cupon}
              </span>
            ) : (
              <span className="flex items-center text-red-600">
                Invalid <VscError />
              </span>
            ))}
        </div>
        <Link to={"/shipping"}>
          {cartItem.length > 0 ? (
            <button className="sm:w-full w-[70%] my-2 py-2  hover:bg-[#39A7FF] bg-[#87C4FF]  text-black font-semibold text-lg rounded-md">
              Checkout
            </button>
          ) : (
            ""
          )}
        </Link>
      </aside>
    </div>
  );
};

export default Cart;

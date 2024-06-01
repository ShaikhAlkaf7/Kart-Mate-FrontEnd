import React, { useState, useEffect } from "react";
import ProductCard from "../components/productComponents/ProductCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

// const product = [
//   {
//     name: "Product",
//     price: 99,
//     image:
//       "https://rukminim2.flixcart.com/image/612/612/xif0q/computer/2/z/t/-original-imagtke6rhxjcj9n.jpeg?q=70",
//     stock: 1,
//     _id: "lisdjjfl",
//     desc: "djfsdlfdsklfsbdklfjsh",
//   },
//   {
//     name: "Product",
//     price: 99,
//     image:
//       "https://rukminim2.flixcart.com/image/416/416/l1v1uvk0/tablet/9/c/s/6650034-realme-original-imagdc5ac3y7xgxh.jpeg?q=70&crop=false",
//     stock: 1,
//     _id: "lisdjjfl",
//     desc: "djfsdlfdsklfsbdklfjsh",
//   },
// ];

const Home = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const banners = [
    "https://img.freepik.com/free-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-psd/landing-page-template-online-fashion-sale_23-2148585400.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg?w=826&t=st=1716290786~exp=1716291386~hmac=73ea241ca63110dd6afec55dddc86a23ef6a059577a3d95d744d22990746ae6d",
  ]; // Array of banner content

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2000); // Change banner every second
    return () => clearInterval(interval);
  }, [banners.length]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_ROUTE}/api/product/latest-product`
      );

      if (data?.success == true) {
        setProducts(data?.products);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pt-10">
      <Helmet>
        <title>Home - Cart-Mate</title>
      </Helmet>
      <section className="w-full sm:h-[70vh] object-cover">
        <img
          src={banners[bannerIndex]}
          alt={banners[bannerIndex]}
          className="w-full sm:h-[70vh] object-contain "
        />
      </section>
      <div className="my-8 px-4 ">
        <h1 className="font-bold text-3xl ">latest Product</h1>
        <div className="flex justify-evenly my-4 gap-2 flex-wrap ">
          {products?.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
        <Link>More</Link>
      </div>
    </div>
  );
};

export default Home;

// 1:47 par puse hai

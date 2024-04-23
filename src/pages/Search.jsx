import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/productComponents/ProductCard";
import { IoFilterOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [data, setdata] = useState([]);
  const [range, setRange] = useState();

  const product = searchParams.get("product");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const price = searchParams.get("price");

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 8;

  const indexOfLastCard = currentPage * cardPerPage;
  const indexofFirstCard = indexOfLastCard - cardPerPage;
  const currentCards = data.slice(indexofFirstCard, indexOfLastCard);

  const totalPage = Math.ceil(data.length / cardPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // fetching  the category in filter coloum
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/product/categories");
      setCategories(data?.categories);
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/search?search=${product != null ? product : ""}&sort=${
          sort != null ? sort : "none"
        }&category=${category != null ? category : ""}&price=${
          price != null ? price : ""
        }`
      );
      setdata(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [product, category, price]);

  const updateSorting = async (e) => {
    const currentParams = new URLSearchParams(searchParams); // Get current parameters
    currentParams.set("sort", e.target.value); // Update 'sort' parameter
    setSearchParams(currentParams); // Update search parameters with all keys
    fetchProducts();
  };

  const updateCategory = async (e) => {
    const currentParams = new URLSearchParams(searchParams); // Get current parameters
    currentParams.set("category", e.target.value); // Update 'sort' parameter
    setSearchParams(currentParams); // Update search parameters with all keys
  };

  const updateRange = async (e) => {
    const currentParams = new URLSearchParams(searchParams); // Get current parameters
    currentParams.set("price", e.target.value); // Update 'sort' parameter
    setSearchParams(currentParams); // Update search parameters with all keys
    setRange(e.target.value);
  };
  return (
    <div className="flex flex-col md:flex-row  w-full md:h-screen pt-10 ">
      <button
        onClick={() => setShow(!show)}
        className=" md:my-5 absolute md:static font-semibold text-xl text-center md:w-full md:hidden mx-5 my-3"
      >
        {" "}
        <IoFilterOutline />
      </button>
      <aside
        className={`md:w-[20%] md:py-5 z-50 fixed  md:static  bg-white  mr-3 px-10 md:px-5  md:m-2 border md:shadow-md h-[90vh] ${
          show ? "translate-x-0" : "-translate-x-60"
        } transition-all duration-300 md:translate-x-0 `}
      >
        <button
          onClick={() => setShow(!show)}
          className=" md:my-5 absolute md:static font-semibold text-2xl text-center md:w-full md:hidden right-1 text-red-600 "
        >
          {" "}
          X
        </button>
        <h1 className=" md:my-5  md:static font-semibold text-xl text-center md:w-full ">
          Filters
        </h1>
        <div className="my-10 md:my-2 w-full  md:px-0 space-y-2">
          <h1 className="font-semibold text-left">Sort</h1>
          <select
            className="w-full border mx-1  py-1 px-3 rounded-md"
            value={sort}
            onChange={updateSorting}
          >
            <option value={null}>None</option>
            <option value="desc">Low to heigh</option>
            <option value="asc">Heigh to Low</option>
          </select>
        </div>

        <div className="my-10 md:my-2 w-full  md:px-0 space-y-2">
          <h1 className="font-semibold text-left">Price</h1>
          <p className="text-black">{range}</p>
          <input
            type="range"
            className=""
            value={range}
            onChange={updateRange}
            max={10000}
          />
        </div>

        <div className="my-10 md:my-2 w-full  md:px-0 space-y-2">
          <h1 className="font-semibold text-left">Category</h1>
          <select
            className="w-full border mx-1  py-1 px-3 rounded-md"
            value={category}
            onChange={updateCategory}
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </aside>
      <main className="w-full md:w-[85%] md:mx-10 px-1 overflow-auto">
        <h1 className="font-semibold text-2xl text-left md:my-5 mx-20 md:mx-0">
          Products
        </h1>
        <div className="flex flex-wrap gap-2 md:justify-between justify-center w-full">
          {currentCards.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
        <div className="w-full text-center p-2  flex gap-3 justify-center text-white">
          {Array.from({ length: totalPage }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-2  rounded-md ${
                index + 1 == currentPage
                  ? "bg-[#27005d]"
                  : " bg-white text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Search;

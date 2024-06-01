import React, { useEffect, useState } from "react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FaSearch, FaShoppingCart, FaSignInAlt, FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/reducer/userReducer";

const Header = () => {
  // const [user, setUser] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state?.userReducer);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(removeUser());
    localStorage.removeItem("userAuthToken");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(searchParams); // Get current parameters
    currentParams.set("product", search); // Update 'sort' parameter
    setSearchParams(currentParams); // Update search parameters with all keys
    navigate(`/search?product=${search}`);
  };
  useEffect(() => {
    const search = searchParams.get("product");
    setSearch(search == null ? "" : search);
  }, []);

  return (
    <nav className="flex items-center justify-between sm:px-4 px-4 w-full py-4  bg-[#39A7FF]  z-50   ">
      <Link to={"/"} className="font-bold sm:text-2xl hidden sm:block">
        Kart-Mate
      </Link>
      <form
        onSubmit={handleSearch}
        className="flex items-center w-[70%] sm:w-[30%]  bg-white rounded-md px-1"
      >
        <input
          type="text"
          placeholder="Search"
          className=" w-[100%] outline-none px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="cursor-pointer" />
      </form>
      <div className="flex items-center justify-between sm:w-[10%] w-[20%] sm:text-xl text-base gap-2">
        <NavLink
          to={"/cart"}
          className={({ isActive }) =>
            `${isActive ? "text-black" : "hover:text-black text-gray-700  "}`
          }
          title="Cart"
        >
          <FaShoppingCart />
        </NavLink>
        {user ? (
          <>
            {user == "admin" ? (
              <NavLink
                to={"/admin/dashboard"}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black" : "hover:text-black text-gray-700  "
                  }`
                }
                title="Dashboard"
              >
                <FaUser />
              </NavLink>
            ) : (
              <NavLink
                to={"/orders"}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black" : "hover:text-black text-gray-700  "
                  }`
                }
                title="My Orders"
              >
                <FaUser />
              </NavLink>
            )}{" "}
            <button title="Logout" onClick={logoutHandler}>
              <TbLogout2 />
            </button>
          </>
        ) : (
          <>
            {" "}
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                `${
                  isActive ? "text-black" : "hover:text-black text-gray-700  "
                }`
              }
              title="Login"
            >
              <FaSignInAlt />
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

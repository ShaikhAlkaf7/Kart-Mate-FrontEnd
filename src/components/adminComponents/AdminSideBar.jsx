import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiCoupon2Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { LuBarChart4 } from "react-icons/lu";
import { FaChartPie } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const AdminSideBar = () => {
  const [slider, setSlider] = useState(false);

  return (
    <>
      <button
        className="lg:hidden z-10 p-4 text-xl text-white absolute"
        onClick={() => setSlider(!slider)}
      >
        <CiMenuBurger />
      </button>
      <aside
        className={`lg:w-full w-48 bg-[#9400FF] p-2 z-10  ${
          slider ? "block absolute top-0 left-0" : "hidden -left-80"
        } lg:block  overflow-y-auto h-screen transition-all duration-500 `}
      >
        <button className="lg:hidden z-10" onClick={() => setSlider(!slider)}>
          <IoClose />
        </button>
        {/* dashboard */}
        <div className="my-8 mx-4">
          <h5 className="font-semibold uppercase my-2 mx-0 ">Dashboard</h5>
          <ul className="flex flex-col gap-2">
            <li className="py-2 px-4">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                <RiDashboardFill />
                Dashboard
              </NavLink>
            </li>
            <li className="py-2 px-4">
              <NavLink
                to={"/admin/product"}
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                <RiShoppingBag3Fill />
                Products
              </NavLink>
            </li>
            <li className="py-2 px-4">
              <NavLink
                to={"/admin/customer"}
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                <IoIosPeople />
                Customer
              </NavLink>
            </li>
            <li className="py-2 px-4">
              <NavLink
                to={"/admin/transaction"}
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                <AiFillFileText />
                Transaction
              </NavLink>
            </li>
          </ul>
        </div>

        {/* charts */}

        <div className="my-8 mx-4">
          <h5 className="font-semibold uppercase my-2 mx-0 ">Charts</h5>
          <ul className="flex flex-col gap-2">
            <li className="py-2 px-4">
              <NavLink
                to="/admin/chart/bar"
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                <LuBarChart4 />
                Bar
              </NavLink>
            </li>
            <li className="py-2 px-4">
              <NavLink
                to={"/admin/chart/pie"}
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                <FaChartPie />
                Pie
              </NavLink>
            </li>
            <li className="py-2 px-4">
              <NavLink
                to={"/admin/chart/line"}
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                <FaChartLine />
                Line
              </NavLink>
            </li>
            <li className="py-2 px-4">
              <NavLink
                to={"/admin/coupon"}
                className={({ isActive }) =>
                  `flex items-center gap-1  p-1 rounded-md ${
                    isActive
                      ? "bg-[#AED2FF]  font-semibold"
                      : "hover:bg-[#aed2ff79]"
                  } `
                }
              >
                <RiCoupon2Fill />
                Coupon
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;

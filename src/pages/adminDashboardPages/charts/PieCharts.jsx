import React, { useEffect, useState } from "react";
import AdminSideBar from "../../../components/adminComponents/AdminSideBar";
import { Chart as ChartJs } from "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";

const PieCharts = () => {
  const [orderFulFilmentRatio, setOrderFulFilmentRatio] = useState([]);
  const [category, setCategory] = useState([]);
  const [stock, setStock] = useState([]);
  const [revenueDistrubation, setRevenueDistrubation] = useState();
  const [ageGroup, setAgeGroup] = useState({});
  const [userRole, setUserRole] = useState({});
  const { user } = useSelector((state) => state?.userReducer);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/pie", {
        headers: {
          Authorization: user?.token,
        },
      });
      setOrderFulFilmentRatio(data?.charts?.orderFullFilment);
      setStock(data?.charts?.stockAvalability);
      setRevenueDistrubation(data?.charts?.revenueDistribution);
      setAgeGroup(data?.charts?.userAgeGroup);
      setUserRole(data?.charts?.userRoles);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductCategories = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/stats", {
        headers: {
          Authorization: user?.token,
        },
      });
      setCategory(data?.categoryCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProductCategories();
  }, []);

  return (
    <div className=" grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10  ">
        <AdminSideBar />
      </div>
      <main className="text-black h-screen lg:col-span-8 col-span-10 bg-[#27005d]  lg:pr-8 px-4  overflow-auto w-full ">
        <section className="flex justify-evenly flex-col md:flex-row ">
          <div className="sm:px-8 sm:pt-4  bg-[#AED2FF] md:w-[50%] w-full   rounded-lg mb-2 mt-6  mr-4 ">
            <Pie
              data={{
                labels: ["Delivered", "Shipped", "Processing"], // the bottom name
                datasets: [
                  {
                    data: orderFulFilmentRatio?.map((d) => d),
                    backgroundColor: ["#224B0C", "#7DCE13", "#5BB318"],
                    offset: [0, 0, 30],
                  },
                ],
              }}
            />
            <h1 className=" font-semibold  text-black text-center py-4 text-sm sm:text-xl">
              Order fulfilment ratio
            </h1>
          </div>
          <div className="sm:px-8 sm:pt-4 bg-[#AED2FF] md:w-[50%] w-full  rounded-lg mb-2 mt-6  mr-4 ">
            <Doughnut
              data={{
                labels: category.map((d) => d[0]), // the bottom name
                datasets: [
                  {
                    data: category.map((d) => d[1]),
                    backgroundColor: [`#35A29F`, "#071952", "#0B666A"],
                    barThickness: "25",
                    // offset: [50, 0, 0],
                  },
                ],
              }}
            />
            <h1 className="text-sm sm:text-xl font-semibold  text-black text-center py-4">
              Product Category Ratio
            </h1>
          </div>
        </section>

        <section className="flex justify-evenly flex-col md:flex-row ">
          <div className="sm:px-8 sm:pt-4 bg-[#AED2FF] md:w-[50%] w-full   rounded-lg mb-2 mt-6  mr-4 ">
            <Doughnut
              data={{
                labels: ["inStock", "out Of Stock"], // the bottom name
                datasets: [
                  {
                    // label: ["In Stock", "out of Stock"],
                    data: stock?.map((d) => d),
                    backgroundColor: ["#06FF00", "#F90716"],
                    barThickness: "25",
                    offset: [0, 50],
                  },
                ],
              }}
            />
            <h1 className="text-sm sm:text-xl font-semibold  text-black text-center py-4">
              Stock Avalability
            </h1>
          </div>

          <div className="sm:px-8 sm:pt-4 bg-[#AED2FF] md:w-[50%] w-full  rounded-lg mb-2 mt-6  mr-4 ">
            <Doughnut
              data={{
                labels: [
                  "margin",
                  "Discount",
                  "production cost",
                  "Burn",
                  "Marketing cost",
                ], // the bottom name
                datasets: [
                  {
                    data: revenueDistrubation?.map((d) => d),
                    backgroundColor: [
                      "#1D2B53",
                      "#7E2553",
                      "#FF004D",
                      "#FAEF5D",
                      "#E26EE5",
                    ],
                    // barThickness: "25",
                    // offset: [0, 50],
                  },
                ],
              }}
            />
            <h1 className="text-sm sm:text-xl font-semibold  text-black text-center py-4">
              Revenue Distrubation
            </h1>
          </div>
        </section>

        <section className="flex justify-evenly flex-col md:flex-row">
          <div className="sm:px-8 sm:pt-4 bg-[#AED2FF] md:w-[50%] w-full  rounded-lg mb-2 mt-6  mr-4 ">
            <Pie
              data={{
                labels: ["teenager", "Adult(21-40)", "Older(Above 40)"], // the bottom name
                datasets: [
                  {
                    data: [ageGroup?.teen, ageGroup?.audult, ageGroup?.old],
                    backgroundColor: ["#1D2B53", "#7E2553", "#FF004D"],
                    // barThickness: "25",
                    // offset: [0, 50],
                  },
                ],
              }}
            />
            <h1 className="text-sm sm:text-xl font-semibold  text-black text-center py-4">
              Age Group
            </h1>
          </div>

          <div className="sm:px-8 sm:pt-4 bg-[#AED2FF] md:w-[50%] w-full  rounded-lg mb-2 mt-6  mr-4 ">
            <Pie
              data={{
                labels: ["Admin", "Custumer"], // the bottom name
                datasets: [
                  {
                    data: [userRole?.admin, userRole?.user],
                    backgroundColor: ["#1D2253", "#8E2533"],
                    // barThickness: "25",
                    // offset: [0, 50],
                  },
                ],
              }}
            />
            <h1 className="text-sm sm:text-xl font-semibold  text-black text-center py-4">
              Admin & Custumer Ratio
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;

import React, { useEffect, useState } from "react";
import AdminSideBar from "../../../components/adminComponents/AdminSideBar";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

const getLastMonths = () => {
  const currentDate = moment();

  const lastSixMonths = [];
  const last12Months = [];

  currentDate.date(1);

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");

    lastSixMonths.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");

    last12Months.unshift(monthName);
  }

  return {
    last12Months,
    lastSixMonths,
  };
};
const BarChats = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state?.userReducer);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/bar", {
        headers: {
          Authorization: user?.token,
        },
      });
      setProducts(data?.chart?.productCount);
      setUsers(data?.chart?.userCount);
      setOrders(data?.chart?.orderCount);
    } catch (error) {
      console.log(error);
    }
  };

  const { last12Months, lastSixMonths } = getLastMonths();

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="  grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10   ">
        <AdminSideBar />
      </div>
      <main className="text-black h-screen lg:col-span-8 col-span-10 bg-[#27005d]  lg:pr-8 px-4  overflow-auto w-full">
        <div className="px-8 pt-4  bg-[#AED2FF] rounded-lg mb-2 mt-6  mr-4 ">
          <Bar
            data={{
              labels: lastSixMonths, // the bottom name
              datasets: [
                {
                  label: "Products",
                  data: products?.map((d) => d),
                  backgroundColor: ["#3468C0"],
                  barThickness: "25",
                },
                {
                  label: "Users",
                  data: users?.map((d) => d),
                  backgroundColor: ["#86A7FC"],
                  barThickness: "25",
                },
              ],
            }}
          />
          <h1 className="text-xl font-semibold  text-black text-center py-4">
            Top selling Products & custumers
          </h1>
        </div>
        <div className="px-8 pt-4 bg-[#AED2FF] rounded-lg mb-2 mt-6  mr-4">
          <Bar
            data={{
              labels: last12Months, // the bottom name
              datasets: [
                {
                  label: "Revenue",
                  data: orders.map((d) => d),
                  backgroundColor: ["#030637"],
                  barThickness: "25",
                },
              ],
            }}
          />
          <h1 className="text-xl font-semibold  text-black text-center py-4">
            Orders Througn the year
          </h1>
        </div>
      </main>
    </div>
  );
};

export default BarChats;

import React, { useEffect, useState } from "react";
import AdminSideBar from "../../../components/adminComponents/AdminSideBar";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import { useSelector } from "react-redux";
import axios from "axios";
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

const LineCharts = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [revenue, setRevenue] = useState([]);

  const { user } = useSelector((state) => state?.userReducer);
  const { last12Months } = getLastMonths();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/line", {
        headers: {
          Authorization: user?.token,
        },
      });
      setDiscount(data?.chart?.discount);
      setProducts(data?.chart?.productCount);
      setRevenue(data?.chart?.revenue);
      setUsers(data?.chart?.userCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen  ">
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10">
        <AdminSideBar />
      </div>
      <main className="text-black h-screen lg:col-span-8 col-span-10 bg-[#27005d]  lg:pr-8 px-4  overflow-auto w-full ">
        <div className="px-8 pt-4 bg-[#AED2FF]  rounded-lg mb-2 mt-6  mr-4 ">
          <Line
            data={{
              labels: last12Months, // the bottom name
              datasets: [
                {
                  data: users,
                  backgroundColor: ["rgb(134, 93, 255,.5)"],
                  borderColor: "rgb(134, 93, 255,)",
                  fill: true,
                  label: "Users",
                },
              ],
            }}
          />
          <h1 className="text-xl font-semibold  text-black text-center py-4">
            Active Users
          </h1>
        </div>
        <div className="px-8 pt-4 bg-[#AED2FF]  rounded-lg mb-2 mt-6  mr-4 ">
          <Line
            data={{
              labels: last12Months, // the bottom name
              datasets: [
                {
                  data: products,
                  backgroundColor: ["rgb(57, 1, 94,.5)"],
                  borderColor: "rgb(57, 1, 94)",
                  fill: true,
                  label: "Products",
                  // borderWidth: 5,
                },
              ],
            }}
          />
          <h1 className="text-xl font-semibold  text-black text-center py-4">
            Total Products
          </h1>
        </div>
        <div className="px-8 pt-4 bg-[#AED2FF]  rounded-lg mb-2 mt-6  mr-4 ">
          <Line
            data={{
              labels: last12Months, // the bottom name
              datasets: [
                {
                  data: revenue,
                  backgroundColor: ["rgb(18, 55, 42,.5)"],
                  borderColor: "rgb(18, 55, 42)",
                  fill: true,
                  label: "Revenue",
                  // borderWidth: 5,
                },
              ],
            }}
          />
          <h1 className="text-xl font-semibold  text-black text-center py-4">
            Total Revenue{" "}
          </h1>
        </div>
        <div className="px-8 pt-4 bg-[#AED2FF]  rounded-lg mb-2 mt-6  mr-4 ">
          <Line
            data={{
              labels: last12Months, // the bottom name
              datasets: [
                {
                  data: discount,
                  backgroundColor: ["rgb(117, 14, 33,.5)"],
                  borderColor: "rgb(117, 14, 33)",
                  fill: true,
                  label: "Discount",
                  // borderWidth: 5,
                },
              ],
            }}
          />
          <h1 className="text-xl font-semibold  text-black text-center py-4">
            Discount Allowted
          </h1>
        </div>
      </main>
    </div>
  );
};

export default LineCharts;

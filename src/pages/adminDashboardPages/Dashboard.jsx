import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/adminComponents/AdminSideBar";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import DataCards from "../../components/adminComponents/dashboard/DataCards";
import RevenueANDinventary from "../../components/adminComponents/dashboard/RevenueANDinventary";
import { useSelector } from "react-redux";
import axios from "axios";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const { user } = useSelector((state) => state?.userReducer);
  const [transactionData, setTransactionData] = useState([]);
  const [stats, setStats] = useState();
  const [barChart, setBarChart] = useState();
  const [InventoryData, setInventoryData] = useState();

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_ROUTE}/api/dashboard/stats`,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      setStats(data?.stats);
      setBarChart(data?.chart);
      setInventoryData(data?.categoryCount);
      setTransactionData(data?.latestTransaction);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // transactionData.map((d, i) => console.log(i));

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className=" grid lg:grid-cols-10 grid-cols-1  gap-6  bg-[#27005d]  h-screen  ">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* sidebar  */}
      <div className="lg:col-span-2 col-span-10  ">
        <AdminSideBar />
      </div>

      <main className="text-white h-screen lg:col-span-8 col-span-10     bg-[#27005d]   overflow-auto w-full ">
        {/* top components (bar) */}
        {/* <div className="h-16 flex items-center  px-4 border-b border-gray-400  ">
          <BsSearch />
          <input
            type="text"
            placeholder="Search for data, users,docs"
            className="bg-[#27005D] border-none outline-none p-4 w-full"
          />
          <FaRegBell className="text-base " />
          <img
            src="https://avatars.githubusercontent.com/u/137059131?v=4"
            alt="user"
            className="h-8 w-8 rounded-full ml-1"
          />
        </div> */}

        {/* statics card  */}
        <DataCards stats={stats} />

        {/* graph section  */}
        <RevenueANDinventary
          chartData={barChart}
          InventoryData={InventoryData}
        />

        {/* transaction containor  */}
        <section className="flex gap-8 py-4 h-[25rem] w-full lg:flex-row     flex-col items-center  lg:items-stretch">
          {/* genderCart */}
          {/* <div className="bg-[#AED2FF] rounded-lg w-full max-w-72 p-4 ">
            <h2 className="text-center my-4 uppercase font-semibold  text-black">
              Gender Ratio
            </h2>
            chart 
            <p className="flex  flex-col w-full items-center justify-center text-3xl  text-black ">
              <BiMaleFemale />

              <Doughnut
                data={{
                  labels: ["Male", "Female"],
                  datasets: [
                    {
                      label: "Gender Ratio",
                      data: [200, 300],
                      backgroundColor: ["#0802A3", "#FF4B91"],
                    },
                  ],
                }}
              />
            </p>
          </div> */}
          <div className="bg-[#AED2FF] rounded-lg w-full lg:px-8 lg:mr-8 ">
            <h1 className="text-center my-4 uppercase font-semibold  text-black text-sm lg:text-xl">
              Top Transaction
            </h1>
            <table className="w-full text-left text-black lg:text-base text-xs ">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((d, i) => (
                  <>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{d.discout}</td>
                      <td>{d.total}</td>
                      <td>{d.status}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

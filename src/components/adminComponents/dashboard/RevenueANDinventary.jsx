import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const RevenueANDinventary = ({ chartData, InventoryData }) => {
  const data = [
    {
      name: "Jan",
    },
    {
      name: "feb",
    },
    {
      name: "Mar",
    },
    {
      name: "Apr",
    },
    {
      name: "May",
    },
    {
      name: "june",
    },
  ];

  const value = 10;

  return (
    <section className="flex gap-2  lg:mr-8 mx-4 lg:mx-0 pb-8 mt-4 items-center justify-between lg:flex-row flex-col lg:items-stretch">
      {/* revenue chart  */}
      <div className="  bg-[#AED2FF] rounded-md lg:w-[80%] w-full  md:py-4 p-4 md:px-8 ">
        <h2 className=" uppercase font-semibold my-4 text-center text-base lg:text-xl text-black">
          Revenue & Transaction
        </h2>
        {/* graphs */}
        {/* <Bar /> */}

        <Bar
          data={{
            labels: data.map((d) => d.name), // the bottom name
            datasets: [
              {
                label: "Revenue",
                data: chartData?.revenue.map((d) => d),
                backgroundColor: ["#3468C0"],
                barThickness: "25",
              },
              {
                label: "Orders",
                data: chartData?.order.map((d) => d),
                backgroundColor: ["#86A7FC"],
                barThickness: "25",
              },
            ],
          }}
        />
      </div>

      {/* category dashboard */}
      <div className="bg-[#AED2FF] text-black rounded-md w-full max-w-64 flex flex-col justify-center pb-8 ">
        <h2 className="uppercase font-semibold my-4 text-center ">Inventory</h2>
        <div className="overflow-y-auto pl-2">
          {/* category item  */}
          {InventoryData?.map((item) => (
            <div className="w-full flex justify-evenly gap-5 px-3 py-2 items-center ">
              <h5 className="">{item[0]}</h5>
              <div className="rounded-3xl ml-auto w-24 bg-[#E4F1FF] h-2 flex-none ">
                <div
                  className={`bg-[#FF165D] h-full rounded-3xl`}
                  style={{ width: `${item[1]}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold">{item[1]}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RevenueANDinventary;

import React from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

const DataCards = ({ stats }) => {
  return (
    <section
      className="text-black lg:flex lg:flex-row lg:justify-between  lg:items-center  lg:gap-8 lg:pt-4 lg:pr-8  lg:pl-0
    justify-evenly  p-4   flex-wrap flex items-center
        "
    >
      {/* indivisual card  */}
      <div className="bg-[#AED2FF] p-6 my-4 w-56  flex items-center justify-between rounded-lg">
        <div>
          <p className="opacity-80 text-sm font-semibold">Revenue</p>
          <h4 className="font-semibold text-2xl">{stats?.revenue}</h4>
          <div className="flex items-center">
            {stats?.monthlyRevenue > 0 ? (
              <span className="flex items-center text-green-600 font-bold gap-1">
                <HiTrendingUp />+{stats?.monthlyRevenue}%
              </span>
            ) : (
              <span className="flex items-center text-red-600 font-bold gap-1">
                <HiTrendingDown />
                {stats?.monthlyRevenue}%
              </span>
            )}
          </div>
        </div>
        <div
          className=" relative h-20 w-20 rounded-full grid place-items-center  before:content-[' '] before:absolute before:h-16 before:w-16 before:rounded-full before:bg-white"
          style={{
            background: `conic-gradient(blue ${
              (Math.abs(stats?.monthlyRevenue) / 100) * 360
            }deg,#E4F1FF 0)`,
          }}
        >
          <span className="relative font-semibold">
            {stats?.monthlyRevenue}%
          </span>
        </div>
      </div>

      <div className="bg-[#AED2FF] w-56  p-6 my-4 flex items-center justify-between rounded-lg">
        <div>
          <p className="opacity-80 text-sm font-semibold">Users</p>
          <h4 className="font-semibold text-2xl">{stats?.userCount}</h4>
          <div className="flex items-center">
            {stats?.userChangePercentage > 0 ? (
              <span className="flex items-center text-green-600 font-bold gap-1">
                <HiTrendingUp />+{stats?.userChangePercentage}%
              </span>
            ) : (
              <span className="flex items-center text-red-600 font-bold gap-1">
                <HiTrendingDown />
                {stats?.userChangePercentage}%
              </span>
            )}
          </div>
        </div>
        <div
          className=" relative h-20 w-20 rounded-full grid place-items-center  before:content-[' '] before:absolute before:h-16 before:w-16 before:rounded-full before:bg-white"
          style={{
            background: `conic-gradient(#00F5FF ${
              (Math.abs(stats?.userCount) / 100) * 360
            }deg,#E4F1FF 0)`,
          }}
        >
          <span className="relative font-semibold">{stats?.userCount}%</span>
        </div>
      </div>

      <div className="bg-[#AED2FF] w-56 p-6 my-4 flex items-center justify-between rounded-lg">
        <div>
          <p className="opacity-80 text-sm font-semibold">Transactions</p>
          <h4 className="font-semibold text-2xl">{stats?.orderCount}</h4>
          <div className="flex items-center">
            {stats?.orderChangePercentage > 0 ? (
              <span className="flex items-center text-green-600 font-bold gap-1">
                <HiTrendingUp />+{stats?.orderChangePercentage}%
              </span>
            ) : (
              <span className="flex items-center text-red-600 font-bold gap-1">
                <HiTrendingDown />
                {stats?.orderChangePercentage}%
              </span>
            )}
          </div>
        </div>
        <div
          className=" relative h-20 w-20 rounded-full grid place-items-center  before:content-[' '] before:absolute before:h-16 before:w-16 before:rounded-full before:bg-white"
          style={{
            background: `conic-gradient(#F8DE22 ${
              (Math.abs(stats?.orderChangePercentage) / 100) * 360
            }deg,#E4F1FF 0)`,
          }}
        >
          <span className="relative font-semibold">
            {stats?.orderChangePercentage}%
          </span>
        </div>
      </div>

      <div className="bg-[#AED2FF] w-56 p-6 my-4  flex items-center justify-between rounded-lg">
        <div>
          <p className="opacity-80 text-sm font-semibold">Products</p>
          <h4 className="font-semibold text-2xl">{stats?.productCount}</h4>
          <div className="flex items-center">
            {stats?.productChangePercentage > 0 ? (
              <span className="flex items-center text-green-600 font-bold gap-1">
                <HiTrendingUp />+{stats?.productChangePercentage}%
              </span>
            ) : (
              <span className="flex items-center text-red-600 font-bold gap-1">
                <HiTrendingDown />
                {stats?.productChangePercentage}%
              </span>
            )}
          </div>
        </div>
        <div
          className=" relative h-20 w-20 rounded-full grid place-items-center  before:content-[' '] before:absolute before:h-16 before:w-16 before:rounded-full before:bg-white"
          style={{
            background: `conic-gradient(#AE00FB ${
              (Math.abs(stats?.productChangePercentage) / 100) * 360
            }deg,#E4F1FF 0)`,
          }}
        >
          <span className="relative font-semibold">
            {stats?.productChangePercentage}%
          </span>
        </div>
      </div>
    </section>
  );
};

export default DataCards;

import React from "react";

const Loader = () => {
  return (
    <div className="pt-10">
      <div className="flex flex-row  pt-10">
        <div className=" h-[50vh] w-full bg-[#ddd] m-[10px]  rounded-md animate-pulse"></div>
        <div className="h-[50vh] w-full bg-[#ddd] m-[10px] rounded-md animate-pulse"></div>
        <div className="h-[50vh] w-full bg-[#ddd] m-[10px] rounded-md animate-pulse"></div>
      </div>
      <div className="flex flex-row  pt-10">
        <div className=" h-[50vh] w-full bg-[#ddd] m-[10px]  rounded-md animate-pulse"></div>
        <div className="h-[50vh] w-full bg-[#ddd] m-[10px] rounded-md animate-pulse"></div>
        <div className="h-[50vh] w-full bg-[#ddd] m-[10px] rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;

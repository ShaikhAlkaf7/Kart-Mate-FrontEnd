import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <div className="rounded-full h-40 w-40 border-t-8 border-l-8 border-r-8 border-b-8  border-r-white border-b-white animate-spin border-black"></div>
    </div>
  );
};

export default Loader;

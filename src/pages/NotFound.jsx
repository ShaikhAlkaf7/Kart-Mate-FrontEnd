import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[80vh] w-screen flex items-center justify-center">
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-semibold ">You Came Wrong Way</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-teal-600 p-2 rounded-md m-2 text-xl font-semibold"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

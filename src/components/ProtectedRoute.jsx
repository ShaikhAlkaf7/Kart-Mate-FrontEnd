import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ authPage, securePage }) => {
  const { user } = useSelector((state) => state?.userReducer);
  const navigate = useNavigate();
  return (
    <>
      {authPage ? user?.token ? <Navigate to={"/"} /> : <Outlet /> : null}
      {securePage ? (
        user?.token ? (
          <Outlet />
        ) : (
          <Navigate to={"/login"} />
        )
      ) : null}
    </>
  );
};

export default ProtectedRoute;

// 1:26

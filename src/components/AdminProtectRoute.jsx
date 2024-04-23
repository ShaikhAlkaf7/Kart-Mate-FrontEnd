import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProtectRoute = () => {
  const { user } = useSelector((state) => state?.userReducer);
  const navigate = useNavigate();
  return (
    <>
      {user?.user?.role == "admin" ? (
        <Outlet />
      ) : (
        toast.error("You cannot access the admin dashboard", {
          position: "top-center",
        }) && <Navigate to={"/"} />
      )}
    </>
  );
};

export default AdminProtectRoute;

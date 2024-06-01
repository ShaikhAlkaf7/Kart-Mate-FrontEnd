import { lazy, Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));

import GenrateCopun from "./pages/adminDashboardPages/GenrateCopun";
import Header from "./components/Header";
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Login = lazy(() => import("./pages/Login"));
const SighUp = lazy(() => import("./pages/SighUp"));
const Shipping = lazy(() => import("./pages/Shipping"));
const PieCharts = lazy(() =>
  import("./pages/adminDashboardPages/charts/PieCharts")
);
const LineCharts = lazy(() =>
  import("./pages/adminDashboardPages/charts/LineCharts")
);
const BarChats = lazy(() =>
  import("./pages/adminDashboardPages/charts/BarCharts")
);
const Dashboard = lazy(() => import("./pages/adminDashboardPages/Dashboard"));
const Product = lazy(() => import("./pages/adminDashboardPages/Product"));
const Customer = lazy(() => import("./pages/adminDashboardPages/Customer"));
const Transaction = lazy(() =>
  import("./pages/adminDashboardPages/Transaction")
);
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./redux/reducer/userReducer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectRoute from "./components/AdminProtectRoute";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const getUserInLocal = localStorage.getItem("userAuthToken");
    dispatch(addUser(JSON.parse(getUserInLocal)));
  }, []);

  const { loading, user } = useSelector((state) => state?.userReducer);
  const isDashboardRoute = location.pathname.startsWith("/admin");

  return loading ? (
    <Loader />
  ) : (
    // <BrowserRouter>
    <>
      {/* header  */}
      {!isDashboardRoute && <Header />}
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductPage />} />
          // login and SighUp
          <Route element={<ProtectedRoute authPage={true} />}>
            <Route path="/sign-up" element={<SighUp />} />
            <Route path="login" element={<Login />} />
          </Route>
          // securePage like agter login
          <Route element={<ProtectedRoute securePage={true} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>
          {/* admin routes  */}
          <Route element={<AdminProtectRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/customer" element={<Customer />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/coupon" element={<GenrateCopun />} />
            {/* charts  */}
            <Route path="/admin/chart/bar" element={<BarChats />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
    // </BrowserRouter>
  );
};

export default App;

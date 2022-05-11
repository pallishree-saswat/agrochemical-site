import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import Product from "./pages/productDetails";
import Signup from "./pages/signup";
import Login from "./pages/login";
import VerifyOtp from "./pages/verify";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetpassword";
import NewPassword from "./pages/newpassword";
import Cart from "./pages/cart";
import CategoryHome from "./pages/CategoryHome";
import SubHome from "./pages/SubHome";
// import AdminDashboard from "./pages//admin/AdminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";

function App() {
  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/verifyEmail" element={<VerifyOtp />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route exact path="/newpassword" element={<NewPassword />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />

          <Route exact path="/admin/category" element={<CategoryCreate />} />
          <Route
            exact
            path="/admin/category/:slug"
            element={<CategoryUpdate />}
          />
          <Route exact path="/admin/sub" element={<SubCreate />} />
          <Route exact path="/admin/sub/:slug" element={<SubUpdate />} />
          <Route exact path="/admin/product" element={<ProductCreate />} />
          <Route exact path="/admin/products" element={<AllProducts />} />
          <Route
            exact
            path="/admin/product/:slug"
            element={<ProductUpdate />}
          />
          <Route exact path="/product/:slug" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/category/:slug" element={<CategoryHome />} />
          <Route exact path="/sub/:slug" element={<SubHome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

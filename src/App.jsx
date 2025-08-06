import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import BrandComp from "./Pages/BrandComp/BrandComp";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsandCondition/Terms";
import ReturnPolicy from "./Pages/ReturnPolicy/ReturnPolicy";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LoginModal from "./Components/Login/LoginModal";
import UserProfile from "./Components/UserProfile/Userprofile";
import MyOrders from "./Components/MyOrders/MyOrders";
import AddressForm from "./Components/AddressForm/AddressForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoaderProvider } from "./Context/LoaderContext";
import { UserProvider, UserContext } from "./Context/UserContext";
import FullScreenLoader from "./Components/FullScreenLoader/FullScreenLoader";
import DashboardHome from "./Components/DashboardHome/DashboardHome";

const AppBody = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(UserContext);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <FullScreenLoader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/brand" element={<BrandComp />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsAndConditions />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="address" element={<AddressForm />} />
        </Route>

      </Routes>

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};

export default function App() {
  return (
    <UserProvider>
      <LoaderProvider>
          <BrowserRouter>
            <AppBody />
          </BrowserRouter>
      </LoaderProvider>
    </UserProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

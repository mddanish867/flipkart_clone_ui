import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import NewTrending from "./components/NewTrending";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mens from "./components/Mens";
import Women from "./components/Women";
import ForgotPassword from "./components/ForgotPassword";
import NewArrivals from "./components/NewArrivals";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";
import KidWear from "./components/KidWear";
import Electronics from "./components/Electronics";
import SportsBooks from "./components/SportsBooks";
import BeautyHealth from "./components/BeautyHealth";
import HomeFurniture from "./components/HomeFurniture";
import AdminDashboard from "./components/AdminDashboard";
import Appliances from "./components/Appliances";
import Cart from "./components/Cart";
import WishList from "./components/WishList";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Order from "./components/Order";
import OrderSummary from "./components/OrderSummary";
import Shirts from "./components/Mens/Shirts";
import TShirts from "./components/Mens/TShirts";
import Shoes from "./components/Mens/Shoes";
import BestElectronics from "./components/Electronics/BestElectronics";
import SearchResult from "./components/SearchResult/SearchResult";
import Header from "./components/Header";
import ProductSummary from "./components/OrderResponse";
import MultiItemCarousel from "./components/MultiItemCarousel";
import OrderResponse from "./components/OrderResponse";
import OrderDetails from "./components/OrderDetails";
import RatingAndReviews from "./components/RatingAndReviews/RatingAndReviews";
import Account from "./components/Account/Account";

function App() {
  return (
    <>
    <div style={{backgroundColor:"#f0f0f0"}}>
    <Router>
        <Header/>
        {/* <Navbar2/> */}
       <br/>
       <br/>
       <br/>
        <Navbar />


        <Routes>
        <Route exact path="/" element={<Carousel />} />      
       
          <Route exact path="/ordersummary" element={<OrderSummary />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/order" Component={Order}/>
          <Route exact path="/mens" element={<Mens />} />
          <Route exact path="/women" element={<Women />} />
          <Route exact path="/productdetails/:productId" Component={ProductDetails} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/kidwear" element={<KidWear />} />
          <Route exact path="/admindashboard" element={<AdminDashboard />} />
          <Route exact path="/appliances" element={<Appliances />} />
          <Route exact path="/cart" Component={Cart} />
          <Route exact path="/wishlist" Component={WishList} />
          <Route exact path="/shirts" element={<Shirts />} />
          <Route exact path="/tshirts" element={<TShirts />} />
          <Route exact path="/shoes" element={<Shoes />} />
          <Route exact path="/productsummary" element={<ProductSummary />} />
          <Route exact path="/orderresponse" element={<OrderResponse />} />
          <Route exact path="/orderdetails/:orderTrackId" Component={OrderDetails} />
          <Route exact path="/ratingandreviews/:orderTrackId" Component={RatingAndReviews} />
          <Route exact path="/account" element={<Account />} />

        </Routes>
        <Footer />
      </Router>
    </div>
      
    </>
  );
}

export default App;

import React from "react";
import { CgProfile } from "react-icons/cg";
import { BsFillHeartFill } from "react-icons/bs";
import { FaBorderStyle } from "react-icons/fa";
import "./MyAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

export default function MyAccount() {
  let [username, setUsername] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    // Displaying Userame from Local storage after successful login
    if (username !== null || username !== "" || username !== undefined) {
      setUsername(localStorage.getItem("email"));
    } else {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("jwtoken");
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleProfiles = () => {
    if (
      localStorage.getItem("email") === "" ||
      localStorage.getItem("email") === undefined ||
      localStorage.getItem("email") === null
    ) {
      navigate("/signin");
    } else {
      navigate("profile");
    }
  };

  const handleOrders = () => {
    if (
      localStorage.getItem("email") === "" ||
      localStorage.getItem("email") === undefined ||
      localStorage.getItem("email") === null
    ) {
      navigate("/signin");
    } else {
      navigate("/orderresponse");
    }
  };

  const hendelWishlist = () => {
    if (
      localStorage.getItem("email") === "" ||
      localStorage.getItem("email") === undefined ||
      localStorage.getItem("email") === null
    ) {
      navigate("/signin");
    } else {
      navigate("/wishlist");
    }
  };

  return (
    <div className="login_tool_tip">
      <div className="login_tool_tip_in">
        <button
          style={{
            textDecoration: "none",
            color: "black",
            border: "none",
            backgroundColor: "white",
            outline: "none",
          }}
          onClick={handleProfiles}
        >
          <CgProfile
            className="profileIcon"
            style={{ marginRight: "10px", color: "#2874f0" }}
          />
          Profile
        </button>
      </div>
      <hr />
      <div className="login_tool_tip_in">
        <button
          style={{
            textDecoration: "none",
            color: "black",
            border: "none",
            backgroundColor: "white",
            outline: "none",
          }}
          onClick={handleOrders}
        >
          <FaBorderStyle
            className="profileIcon"
            style={{ marginRight: "10px", color: "#2874f0" }}
          />
          Orders
        </button>
      </div>
      <hr />
      <div className="login_tool_tip_in">
        <button
          style={{
            textDecoration: "none",
            color: "black",
            border: "none",
            backgroundColor: "white",
            outline: "none",
          }}
          onClick={hendelWishlist}
        >
          <BsFillHeartFill
            className="profileIcon"
            style={{ marginRight: "10px", color: "#2874f0" }}
          />
          WishList
        </button>
      </div>
      <hr />
      <div className="login_tool_tip_in">
        <button
          style={{
            textDecoration: "none",
            color: "black",
            border: "none",
            backgroundColor: "white",
            outline: "none",
          }}
          onClick={handleLogout}
        >
          <FiLogOut
            className="profileIcon"
            style={{ marginRight: "10px", color: "#2874f0" }}
          />
          Logout
        </button>
      </div>
    </div>
  );
}

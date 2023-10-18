import React from "react";
import { CgProfile } from "react-icons/cg";
import { BsFillHeartFill } from "react-icons/bs";
import { FaBorderStyle } from "react-icons/fa";
import "./LoginToolTip.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginToolTip() {
  let navigate = useNavigate();

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
        <p style={{ marginTop: "15px" }}>New Customer?</p>
        <Link
          to="/signup"
          className="pull-right"
          style={{ color: "#2874f0", marginLeft: "40px" }}
        >
          SignUp
        </Link>
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
    </div>
  );
}

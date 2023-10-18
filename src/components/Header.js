import React from "react";
import { MdSearch } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "./Header.css";
import MoreFeature from "./MoreFeature";
import LoginToolTip from "./LoginToolTip";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MyAccount from "./MyAccount";

export default function Header() {
  let [flag, setFlag] = useState(true);

  let [username, setUsername] = useState('');
  useEffect(() => {
     // Displaying Userame from Local storage after successful login
     setUsername(localStorage.getItem('email'));
    const checkuser = localStorage.getItem('email');
     if(checkuser === "" || checkuser === null ||  checkuser === undefined){
      localStorage.clear();
      setFlag(false);
      navigate("/");
           
    }
    else{
      setFlag(true);
      setUsername(localStorage.getItem('email')); 
    }  
  }, []);

  let navigate = useNavigate();
  function handleLogin() {
    setFlag(false);
    navigate("/signin");
  }
  return (
    <div className="header fixed-top">
      <div className="header__first">
        <Link
          to="/"
          style={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            fontStyle: "italic",
            fontSize: "900",
          }}
        >
          Anjumart
        </Link>
      </div>
      <div className="header__second">
        <input type="text" placeholder="Search for products, brands and more" />
        <MdSearch className="icon" />
      </div>
      {!flag && (
 <div className="header__third">
        <Tippy content={<LoginToolTip />} interactive={true} offset={[5, 11]}>
          <button onClick={handleLogin}>Login</button>
        </Tippy>
      </div>
      )}
     
      
      {flag && (
        <div className="header__third">
          <Tippy content={<MyAccount />} interactive={true} offset={[5, 11]}>
            <span style={{ color: "white" }}>{username}</span>
          </Tippy>
          <RiArrowDropDownLine style={{ color: "white" }} />
        </div>
      )}    

      <div className="header__fourth">
        <Tippy content={<MoreFeature />} interactive={true} offset={[5, 15]}>
          <span>More</span>
        </Tippy>
        <RiArrowDropDownLine style={{ color: "white" }} />
      </div>
      <div className="header__fifth">
        <Link to="/cart">
          <FaShoppingCart className="IconCart" style={{ color: "white" }} />
        </Link>
      </div>
    </div>
  );
}

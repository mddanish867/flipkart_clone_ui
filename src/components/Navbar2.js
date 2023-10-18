import React from "react";
import "./Navbar2.css";
import { Link ,useNavigate} from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import  { useState, useEffect } from 'react'
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

export default function Navbar2({setResults}) {
  const [searchText, setSearchText] = useState('');
  const [productdata, setProductData] = useState([]);
  let [username, setUsername] = useState('');
  let navigate = useNavigate();
  useEffect(() => {  
    // Displaying Userame from Local storage after successful login
    if(username !== null || username !== '' || username !== undefined){
      setUsername(localStorage.getItem('email'));      
    }
    else{
      localStorage.clear();
      navigate("/");
    }      
   

}, []);

 // retrieve all products
 const getproductData = async (value) => {
  const response = await axios.get(
    "https://localhost:7274/api/Products/RetrieveProductList/products?Category=Mens%20Wear"
  );
  setProductData(response.data.result); 
  setResults(productdata);
};

const handleChange = value =>{
  setSearchText(value);
  getproductData(value);
}

// Logout functionality
const handleLogout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("jwtoken");
  localStorage.clear();
  navigate("/");
  window.location.reload();
};

const handleWishList = () =>{
  navigate("/wishlist");
}
  return (
    <div>
      {/* <!-- Navbar --> */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        id="navbar2"
      >
        <a className="navbar-brand " id="brand" href="/">
          <b>eCom</b>
        </a>
        <div className="col-md-8 form-group">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <!-- Link --> */}
            <li className="nav-item">
              <input
                className="form-control"
                type="search"
                id="searchProduct"
                value={searchText}
                onChange={ (e)=> handleChange (e.target.value)}
                placeholder="Search for products, brands & more"
              />
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-warning"
                id="searchButton"
              >
                Search
              </button>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav me-auto mb-lg-3" id="navLink">
          {!username && (
            <li>
              <Link className="nav-link text-black" to="/signin">
                <FaRegUser id="userIcone" />
              </Link>
            </li>
          )}

          <li>
            <Link
              className="nav-link text-black badge badge-light my-2"
              to="/cart"
            >
              <BiCart id="userIcon" />
              <span className="badge rounded-pill badge-notification bg-danger">
                9
              </span>
            </Link>
          </li>
          {username && 
          <li>
          <Link className="btn btn-dark  my-2 btn-md" id="logOutNav" onClick={handleLogout}><FiLogOut id="logOutNavIcon"/> Logout</Link>

          </li>
          }
          
          {username && (
            <li>


                              

              <select className="form-select my-2 form-control" style={{"border-radius":"0 0 0 0","border-color":"white","color":"rgb(226, 36, 36)"}}>
              <option className="form-select my-2 form-control">
              <label className="mb-2"></label>

                </option>
                <option className="form-select my-2 form-control" style={{"width":"30px"}}>
                  <Link>Profile</Link>
                </option>
                <hr />
                <option className="form-select my-2 form-control">
                  <Link>Orders</Link>
                </option>
                <hr />
                <option className="form-select my-2 form-control">
                  <Link to='/wishlist' onClick={handleWishList}>Wishlist</Link>
                </option>
                <hr />
                {username && (
                  <option className="form-select my-2 form-control">
                    <Link className="btn btn-dark  btn-md" style = {{"background-color":"black","border-radius":"0 0 0 0"}} onClick={handleLogout}><FiLogOut/> Logout</Link>
                  </option>
                )}
              </select>

            </li>
          )}
        </ul>
      </nav>
      {/* <!-- Navbar --> */}
    </div>
  );
}

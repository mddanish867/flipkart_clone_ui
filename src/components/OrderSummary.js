import React from "react";
import { TfiGift } from "react-icons/tfi";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ChangeAddressPopup from "./Popups/ChangeAddressPopup";
import "./OrderSummary.css";

export default function OrderSummary() {
  let userEmail = localStorage.getItem("email");
  const [getOrders, setOrders] = useState([]);
  const [tortalPrice, setTotalPrice] = useState(0);
  const [custName, setcustName] = useState("");
  const [custAddress, setcustAddress] = useState("");
  const [custMobile, setcustMobile] = useState("");
  const [recommendedProduct, setrecommendedProduct] = useState([]);
  const [retriveSubCategory, setretriveSubCategory] = useState([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [productImageUrl, setproductImageUrl] = useState("");
  let [itemCount, setItemCount] = useState(0); 

  useEffect(() => {
    getOrderData();
    getRecommendedProducts();
  }, []);

  // Retrieve Order details based on  username
  const getOrderData = async () => {
    let orderPrice = 0;
    const response = await axios.get(
      `https://localhost:7274/api/Order/RetrieveOrderDetails/orders?UserName=${userEmail}`
    );
    for (let i = 0; i < response.data.result.length; i++) {
      orderPrice = orderPrice + response.data.result[i].totalAmount;
      setcustName(response.data.result[i].name);
      setcustAddress(response.data.result[i].address);
      setcustMobile(response.data.result[i].mobile);
      setTotalPrice(orderPrice);
      setColor(response.data.result[i].color);
      setSize(response.data.result[i].size);
      setBrand(response.data.result[i].setBrand);
      setretriveSubCategory(response.data.result[i].subCategory);
      setproductImageUrl(response.data.result[i].productImageUrl);
      setItemCount(response.data.result.length);
    }
    setOrders(response.data.result);
  };

  const sentmail = async () => {
    let data = {
      toEmail: "akhtardanish298@gmail.com",
      subject: "Order confirmation mail",
      body: `
    
    <div className="container my-4">
            <div className="card mdb-color lighten-1 text-center z-depth-2">           
              <section
                className="shadow-4 py-4"
                style={{ "background-color": "white" }}
              >
                <div className="container">
                  <div className="row gx-4">
                    <div className="col-lg-8 mb-4">
                      <div className=" px-3 py-2 ">
                        <div className="py-1 col-12 mx-1 pull-left">
                          <div className="row justify-content-center mb-3">
                            <div
                              className="card  mx-1"
                              style={{
                                "border-color": "white",
                                "margine-right": "0px",
                              }}
                            >
                              <div className="card-body">
                                <div className="row">
                                  <TfiGift
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      color: "#fa2d6e",
                                    }}
                                  />
                                  <h2 style={{ "text-align": "left" }}>
                                    Order Placed for &#8377; ${tortalPrice}
                                  </h2>
                                  <span style={{ "text-align": "left" }}>
                                    Your 1 item will be delivered by by Sat, Sep
                                    23rd '23.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 my-2">
                      <div className="card" style={{ "border-color": "white" }}>
                        <div className="card-body">
                          <h5 className="card-title">Why call? Just click!</h5>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              <span>Easily track all your eCome orders!</span>
                            </li>
                          </ul>
                          <button
                            type="button"
                            className="btn btn-warning  btn-md my-3"
                            style={{
                              "border-radius": "0 0 0 0",
                              "background-color": "#fa2d6e",
                              color: "white",
                            }}
                          >
                            Got to My Orders
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>          
      
              </section>           
            </div>
          </div>      
 
          <div className="container my-4">
        <div className="card mdb-color lighten-1 text-center z-depth-2">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <h5 align="justify" className=" mx-4 my-4">
                  Delivery Address
                </h5>
                <h6 className="my-4 mx-4" align="justify">
                ${custName}
                </h6>

                <p className="mx-4 text-justify" align="justify">
                ${custAddress}
                </p>
                <h6 align="justify" className=" mx-4">
                  Phone Number ${custMobile}
                </h6>                
              </div>
              <div className="col-sm">
                <h5 className="my-4">Your Reward</h5>

                <p className="my-4">6 SuperCoins Cashback</p>
              </div>
              <div className="col-sm">
                <h5 className="my-4">More actions</h5>
                <p className="my-4">Share order details</p>
                <button
                  type="button"
                  className="btn btn-warning  btn-md my-3"
                  style={{
                    "border-radius": "0 0 0 0",
                    "background-color": "#fa2d6e",
                    color: "white",
                  }}
                >
                  Share order
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
          <div className="container my-4">
        <div className="card mdb-color lighten-1 text-center z-depth-2">
          <div className="container">
            <div className="row gx-4">
              <div className="col-lg-8 mb-4">
                <div className=" px-3 py-2 ">
                  <div className="py-1 col-12 mx-1 pull-left">
                    <div className="row justify-content-center mb-3">
                      <div
                        className="card shadow-4 mx-1"
                        style={{ "border-color": "white" }}
                      >
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                              <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                <img
                                  src=${productImageUrl}
                                  className="w-100"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-6">
                              <div className="d-flex flex-row">
                                <h5>Round neck Tshirt</h5>
                              </div>
                              <div className="d-flex flex-row">
                                Size: <span>${size} </span>
                              </div>
                              <div className="d-flex flex-row">
                                Color: <span> ${color}</span>
                              </div>
                              <div className="d-flex flex-row">
                                Brand: <span> ${brand} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card" style={{ "border-color": "white" }}>
                  <div className="card-body">
                    <h5 align="justify">&#8377; 309</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        <a href="" align="justify">
                          cancel
                        </a>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        <a href="" align="justify">
                          Need help?
                        </a>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-center px-0 my-5">
                        <strong>Total &#8377;309</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
    `,
    };
    const url = "https://localhost:7274/api/Mail/SendEmail";
    await axios
      .post(url, data)
      .then((result) => {
        Swal.fire(result.data.message);
        // alert(result.data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  // recommended item based on user selection
  const getRecommendedProducts = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductList/products?SubCategory=${retriveSubCategory}`
    );
    for (let i = 0; i < 8; i++) {
      setrecommendedProduct(response.data.result[i]);
    }
  };

  // handle wishlist
  function handleWishList() {}
  return (
    <>
      <div style={{ backgroundColor: "#eee" }}>
        <div
          className="container my-2"
          style={{
            boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
            backgroundColor: "#fff",
          }}
        >
          <div className="card" style={{ border: "none" }}>
            <div className="container">
              <div className="row">
                <div className="col-8 my-4" style={{ display: "flex" }}>
                  <TfiGift
                    style={{
                      width: "80px",
                      height: "80px",
                      color: "#e7c905",
                    }}
                  />
                  <h4
                    className="mx-4 my-4"
                    style={{ textAlign: "left", color: "blue" }}
                  >
                    Order Placed for &#8377;{tortalPrice}
                  </h4>
                  <span className="my-4" style={{ textAlign: "left" }}>
                    Your {itemCount} item will be delivered by by Sat, Sep 23rd
                    '23.
                  </span>
                </div>

                <div className="col-sm">
                  <h5 className="my-4">Why call? Just click!</h5>
                  <p className="my-4">
                    <span>Easily track all your eCome orders!</span>
                  </p>
                  <Link
                    type="button"
                    className="btn btn-warning  btn-md my-2"
                    to="/orderresponse"
                    style={{
                      borderColor: "#2874f0",
                      backgroundColor: "#2874f0",
                      color: "white",
                      outline: "none",
                      fontSize: "13px",
                      borderRadius: "0",
                    }}
                  >
                    Go to My Orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container my-2"
          style={{
            boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
            backgroundColor: "#fff",
          }}
        >
          <div
            className="card mdb-color lighten-1 text-center z-depth-2"
            style={{ border: "none" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <h5
                    align="justify"
                    className=" mx-4 my-1"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                  >
                    Delivery Address
                  </h5>
                  <div style={{ display: "flex" }}>
                    <h6
                      className="my-2 mx-4"
                      align="justify"
                      style={{ fontSize: "14px", fontWeight: "500" }}
                    >
                      {custName}
                    </h6>
                    <button
                      style={{
                        borderRadius: "1px",
                        backgroundColor: "#fb641b",
                        color: "white",
                        outline: "none",
                        boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
                        display: "inline-block",
                        padding: "10px 20px",
                        fontSize: "13px",
                        fontWeight: "500",
                        verticalAlign: "super",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        height: "35px",
                        width: "auto",
                        minWidth: "86px",
                        color: "#2874f0",
                        border: "none",
                        textAlign: "center",
                        marginLeft: "135px",
                      }}
                    >
                      Change
                    </button>
                  </div>
                  <p
                    className="mx-4 text-justify my-4"
                    align="justify"
                    style={{ fontSize: "14px" }}
                  >
                    {custAddress}
                  </p>
                  <h6
                    align="justify"
                    className=" mx-4"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Phone Number: {custMobile}
                  </h6>
                  <Link
                    type="button"
                    className="btn btn-warning  btn-md my-2"
                    to="/orderresponse"
                    style={{
                      borderColor: "white",
                      backgroundColor: "white",
                      color: "#2874f0",
                      outline: "none",
                      fontSize: "13px",
                      borderRadius: "0",
                      fontWeight: "600",
                      marginRight: "160px",
                    }}
                  >
                    Change or Add Number
                  </Link>
                </div>
                <div className="col-3">
                  <h5
                    className="my-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginRight: "50px",
                    }}
                  >
                    Your Reward
                  </h5>

                  <p className="my-4" style={{ fontSize: "14px" }}>
                    6 SuperCoins Cashback
                  </p>
                </div>
                <div className="col-5">
                  <h5
                    className="my-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginRight: "344px",
                    }}
                  >
                    More actions
                  </h5>
                  <div className="my-2" style={{ display: "flex" }}>
                    <p style={{ marginTop: "22px", fontSize: "14px" }}>
                      Share order details
                    </p>
                    <button
                      type="button"
                      className="btn btn-light  btn-md my-3"
                      style={{
                        borderRadius: "1px",
                        backgroundColor: "#fb641b",
                        color: "white",
                        outline: "none",
                        boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
                        display: "inline-block",
                        padding: "10px 20px",
                        fontSize: "13px",
                        fontWeight: "500",
                        verticalAlign: "super",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        height: "35px",
                        width: "auto",
                        minWidth: "140px",
                        color: "#2874f0",
                        border: "none",
                        textAlign: "center",
                        marginLeft: "180px",
                      }}
                    >
                      Share order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container my-2"
          style={{
            boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
            backgroundColor: "#fff",
          }}
        >
          {getOrders.map((data) => {
            return (
              <div className="row gx-4">
                <div className="col-lg-6 mb-4" style={{ height: "20px" }}>
                  <div className=" px-3 py-2 ">
                    <div className="py-1 col-12 mx-1 pull-left">
                      <div className="row justify-content-center mb-3">
                        <div
                          className="card mx-1"
                          style={{ border: "none", height: "18px" }}
                        >
                          <div className="card-body">
                            <div className="row">
                              <div
                                className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0"
                                style={{
                                  width: "110px",
                                  marginLeft: "-42px",
                                }}
                              >
                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                  <img
                                    src={data.productImageurl}
                                    className="w-100"
                                    alt=""
                                  />
                                  <Link>
                                    <div className="hover-overlay">
                                      <div
                                        className="mask"
                                        id="maskNewArrival"
                                      ></div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="col-md-6 col-lg-6 col-xl-6">
                                <div className="d-flex flex-row">
                                  <h5>{data.productName.slice(0, 25)}</h5>
                                </div>
                                <div className="d-flex flex-row">
                                  Size: <span>{data.size} </span>
                                </div>
                                <div className="d-flex flex-row">
                                  Color: <span> {data.color}</span>
                                </div>
                                <div className="d-flex flex-row">
                                  Brand: <span> {data.brand} </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
<div className="col-4 mb-4">  
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card card-stepper" style={{border:"none",marginLeft:"-243px",marginBottom:"-73ppx"}}>
          <div className="card-body p-4">
            <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
              <span className="dot"></span>
              <hr className="flex-fill track-line"/><span className="dot"></span>
              <hr className="flex-fill track-line"/><span className="dot"></span>
              <hr className="flex-fill track-line"/><span className="dot"></span>
              <hr className="flex-fill track-line"/><span
                className="d-flex justify-content-center align-items-center big-dot dot">
                <i className="fa fa-check text-white"></i></span>
            </div>

            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-column align-items-start"><span>15 Mar</span><span>Order placed</span>
              </div>
              <div className="d-flex flex-column justify-content-center"><span>15 Mar</span><span>Order
                  placed</span></div>
              <div className="d-flex flex-column justify-content-center align-items-center"><span>15
                  Mar</span><span>Order Dispatched</span></div>
              <div className="d-flex flex-column align-items-center"><span>15 Mar</span><span>Out for
                  delivery</span></div>
              <div className="d-flex flex-column align-items-end"><span>15 Mar</span><span>Delivered</span></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
                <div className="col-lg-2 mb-4">
                  <div className="card" style={{ borderColor: "white" }}>
                    <div className="card-body">
                      <h5 align="justify">&#8377; {data.productDiscount}</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          <a href="" align="justify">
                            cancel
                          </a>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          <a href="" align="justify">
                            Need help?
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <section id="mensSection">
          <div className="container py-">
            <div className="row">
              <h3>Recommended items</h3>

              {recommendedProduct.map((data) => {
                return (
                  <div
                    className=" col-12 col-md-12 col-lg-3 mb-4 mb-lg-0 my-3 mx-0"
                    id="roundedCircle"
                  >
                    <Link
                      to={`/productdetails/${data.productId}`}
                      id="productLink"
                    >
                      <div className="card bg-body rounded">
                        <div className="d-flex justify-content-between p-3">
                          <div className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong">
                            <Link
                              className="btn btn-white px-3"
                              type="button"
                              id="button-addon1"
                              data-mdb-ripple-color="white"
                              onClick={handleWishList}
                            >
                              <BsHeart style={{ color: "#fa2d6e" }} />
                            </Link>
                          </div>
                        </div>
                        <img
                          src={data.productImageurl}
                          className="card-img-top"
                          alt="Laptop"
                          id="cardImage"
                        />
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <p className="small">
                              <a
                                href="/productdetails"
                                className="text-muted"
                                id="productName"
                              >
                                {data.productName.slice(0, 23)}
                              </a>
                            </p>
                            <p className="small text-danger">
                              <s>&#8377; {data.productPrice}</s>
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0" id="prodcutDesc">
                              {data.productDescription.slice(0, 20)}
                            </h6>
                            <h5 className="text-dark mb-0">
                              &#8377; {data.productDiscount}
                            </h5>
                          </div>

                          <div
                            className="d-flex justify-content-between mb-2"
                            id="stockId"
                          >
                            <p className="text-muted mb-0" id="stockId">
                              {data.productQuanitity} In stock
                            </p>
                            <div className="ms-auto text-warning">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

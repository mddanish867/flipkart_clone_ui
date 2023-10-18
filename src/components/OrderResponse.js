import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsHeart } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { LiaStarSolid } from "react-icons/lia";
import Swal from "sweetalert2";

export default function OrderResponse() {
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
  let status = "";
  let orderStatus = [];
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
  function handleWishList() {

  }
  const Filter = async () =>{
    let orderPrice = 0;

  console.log(orderStatus)
    const response = await axios.get(      
      `https://localhost:7274/api/Order/FilterOrder/orders?Status=Delivered${orderStatus.join(`','`)}`
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
}
  // method to filter orders
  const onTheWayOnChange = (e) =>{  
    let isChecked = e.target.checked;
    let onthewayStatus = "";
    if(isChecked === true){
        let isExist = orderStatus.includes('On the way')
        if(isExist !== true){
          onthewayStatus = 'On the way';
          orderStatus.push(onthewayStatus.slice(9)); 
        }
        else{
          orderStatus.pop();
        }
    }
    else{
      orderStatus.pop();
      getOrderData();
    } 
    Filter();      
    console.log(orderStatus)

  }
  const deliveredOnChange = (e) =>{
    let isChecked = e.target.checked;
    let deliveredStatus = "";
    if(isChecked === true){
        let isExist = orderStatus.includes('Delivered')
        if(isExist !== true){
          deliveredStatus = 'Delivered';
          orderStatus.push(deliveredStatus.slice(9)); 
        }
        else{
          orderStatus.pop();
        }
    }
    else{
      orderStatus.pop();
      getOrderData();

    }  
    Filter(); 
    console.log(orderStatus)
  }
  const CancelledOnChange = (e) =>{
    let isChecked = e.target.checked;
    let cancelledStatus = "";
    if(isChecked === true){
        let isExist = orderStatus.includes('Cancelled')
        if(isExist !== true){
          cancelledStatus = 'Cancelled';
          orderStatus.push(cancelledStatus.slice(9)); 
        }
        else{
          orderStatus.pop();
        }
    }
    else{
      orderStatus.pop();
    }
    Filter(); 
    console.log(orderStatus)

  }
  const returnedOnChange = (e) =>{
    let isChecked = e.target.checked;
    let returnedStatus = "";
    if(isChecked === true){
        let isExist = orderStatus.includes('Returned')
        if(isExist !== true){
          returnedStatus = 'Returned';
          orderStatus.push(returnedStatus.slice(9)); 
        }
        else{
          orderStatus.pop();
        }
    }
    else{
      orderStatus.pop();
    }
    Filter(); 
    console.log(orderStatus)

  }
  return (
    <>
      <section style={{ display: "flex", backgroundColor: "#eee" }}>
        <div className="col-3 my-2">
          <div
            className="card my-3"
            style={{
              borderRadius: "0 0 0 0",
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
            }}
          >
            <h6
              style={{
                marginLeft: "18px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Filters
            </h6>
            <article className="filter-group my-2">
              <h6
                className="title"
                style={{
                  marginLeft: "18px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                ORDER STATUS
              </h6>

              <div className="filter-content collapse show" id="collapse_2">
                <div className="card-body">
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" onChange={e => onTheWayOnChange(e)} />
                    <div className="custom-control-label">On the way</div>
                  </label>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" onChange={e => deliveredOnChange(e)}/>
                    <div className="custom-control-label">Delivered</div>
                  </label>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" onChange={e => CancelledOnChange(e)}/>
                    <div className="custom-control-label">Cancelled</div>
                  </label>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" onChange={e => returnedOnChange(e)}/>
                    <div className="custom-control-label">Returned</div>
                  </label>
                </div>
              </div>
            </article>

            <article className="filter-group">
              <h6
                className="title"
                style={{
                  marginLeft: "18px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                ORDER TIME
              </h6>

              <div className="filter-content collapse show" id="collapse_2">
                <div className="card-body">
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <div className="custom-control-label">Last 30 day</div>
                  </label>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <div className="custom-control-label">2023</div>
                  </label>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <div className="custom-control-label">2022</div>
                  </label>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <div className="custom-control-label">2021</div>
                  </label>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <div className="custom-control-label">2020</div>
                  </label>
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" />
                    <div className="custom-control-label">Older</div>
                  </label>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="col-9 my-4">
          <div
            className="form-outline"
            style={{
              display: "flex",
              marginLeft: "-13px",
              marginRight: "100px",
            }}
          >
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="search your orders here"
              aria-label="Search"
              style={{ borderRadius: "5px 0 0 5px", outline: "none" }}
            />
            <button
              type="button"
              className="btn btn-primary"
              style={{ borderRadius: "0 5px 5px 0", outline: "none" }}
            >
              <CgSearch /> Search Orders
            </button>
          </div>
          {getOrders.map((data) => {
            status = data.status;
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={
                  userEmail !== null
                    ? `/orderdetails/${data.orderTrackId}`
                    : `/signin`
                }
              >
                <div
                  className="row gx-4 my-3"
                  style={{
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
                    backgroundColor: "#fff",
                    marginBottom: "10px",
                    marginRight: "2px",
                  }}
                >
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
                                      style={{ height: "75px" }}
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
                                  <div
                                    className="d-flex flex-row"
                                    style={{ width: "190px" }}
                                  >
                                    <span
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {data.productName.slice(0, 25)}
                                    </span>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ display: "block" }}
                                  >
                                    <span
                                      className="text-muted"
                                      style={{ fontSize: "12px" }}
                                    >
                                      Size: {data.size}{" "}
                                    </span>
                                    <span
                                      className="text-muted"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      Color: {data.color}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 mb-4">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          color: "black",
                        }}
                      >
                        &#8377;{data.productDiscount}
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 mb-4"
                    style={{ marginLeft: "-75px" }}
                  >
                    <div className="card" style={{ borderColor: "white" }}>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          {status === "Cancelled" && (
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              <spna
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                <AiTwotoneQuestionCircle
                                  style={{ color: "red" }}
                                />{" "}
                                Cancelled on
                              </spna>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                <p style={{ fontSize: "12px" }}>
                                You requested a cancellation because you changed your mind about this product.
                                </p>
                              </li>
                              </ul>
                          )}
                          {status === "Delivered" && (
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                <span
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "14px",
                                  }}
                                >
                                  <AiTwotoneQuestionCircle
                                    style={{ color: "green" }}
                                  />
                                  Delivered on
                                </span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                <p style={{ fontSize: "12px" }}>
                                  Your item has been delivered.
                                </p>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                <Link
                                  to={`/ratingandreviews/${data.orderTrackId}`}
                                  align="justify"
                                  style={{ textDecoration: "none" }}
                                >
                                  <LiaStarSolid />{" "}
                                  <span
                                    style={{
                                      textDecoration: "none",
                                      fontWeight: "500",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Rate & Review Product
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          )}
                          {status === "Returned" && (
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              <span
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                <AiTwotoneQuestionCircle
                                  style={{ color: "green" }}
                                />
                                Return on
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                <p style={{ fontSize: "12px" }}>
                                  Your item has been returned.
                                </p>
                              </li>
                              </ul>
                          )}
                          {status === "Out For Delivery" && (
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              <spna
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                <AiTwotoneQuestionCircle
                                  style={{ color: "green" }}
                                />
                                Out For Delivery on
                              </spna>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                <p style={{ fontSize: "12px" }}>
                                  Your item has been dispatched.
                                </p>
                              </li>
                              </ul>
                          )}
                          {status === "Shipped" && (
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              <spna
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                <AiTwotoneQuestionCircle
                                  style={{ color: "green" }}
                                />{" "}
                                Shipped on
                              </spna>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                <p style={{ fontSize: "12px" }}>
                                  Your item has been shipped.
                                </p>
                              </li>
                            </ul>
                          )}
                          {status === "Order Confirmed" && (
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                              <spna
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                <AiTwotoneQuestionCircle
                                  style={{ color: "green" }}
                                />{" "}
                                Order Confirmed on
                              </spna>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                <p style={{ fontSize: "12px" }}>
                                  Your item has been confirmed.
                                </p>
                              </li>
                            </ul>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

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
    </>
  );
}

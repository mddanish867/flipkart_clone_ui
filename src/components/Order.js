import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { BiBold, BiPlus } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import "./Order.css";

export default function Order() {
  const [getProductId, setProductId] = useState([]);
  const [count, setCount] = useState(1);
  const [state, setState] = useState(false);
  let [afterDiscount, setAfterDiscount] = useState(0);
  let [actualPrice, setActualPrice] = useState(0);
  let setSubTotal = 0;
  let priceofProduct = 0;
  let [captcha, setCaptcha] = useState("");
  const [productById, setProductById] = useState([]);
  const params = useParams();
  let [step1, setStep1] = useState(false);
  let [step2, setStep2] = useState(false);
  let [step3, setStep3] = useState(true);
  let [step4, setStep4] = useState(false);
  let [cashOnDelivery, setCashOnDelivery] = useState(false);
  let [googlePay, setGooglepay] = useState(false);
  let [paymentUPI, setPaymentUPI] = useState(false);
  let [debitCreditCard, setDebitCreditCard] = useState(false);
  let [newAddress, setNewAddress] = useState(false);
  let [userInfo, setUserInfo] = useState("");
  let userEmail = localStorage.getItem("email");
  let [displayNewAddress, setDisplayNewAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [deliveryMail, setDeliveryMail] = useState("");
  const [dUserName, setUserName] = useState("");
  const [region, setRegion] = useState("");
  const [place, setPlace] = useState("");
  const [zip, setZIP] = useState("");
  const [captchaVerification, setcaptchaVerification] = useState("");
  const [orderProductName, setorderProductName] = useState("");
  const [orderProductDescription, setorderProductDescription] = useState("");
  const [orderProductPrice, setorderProductPrice] = useState("");
  const [orderProductDiscount, setorderProductDiscount] = useState("");
  let orderProductQuanitity = count;
  const [orderStatus, setorderStatus] = useState("");
  const [orderProductImageurl, setorderProductImageurl] = useState("");
  const [orderCategory, setorderCategory] = useState("");
  const [orderSubCategory, setorderSubCategory] = useState("");
  const [orderType, setorderType] = useState("");
  const [orderColor, setorderColor] = useState("");
  const [orderMaterial, setorderMaterial] = useState("");
  const [orderBrand, setorderBrand] = useState("");
  const [orderSize, setorderSize] = useState("");
  const [orderRating, setorderRating] = useState("");
  const [orderProductId, setorderProductId] = useState("");
  const [orderCount, setorderCount] = useState("");
  const [orderAddress, setorderAddress] = useState("");
  const [orderMobile, setorderMobile] = useState("");
  const [orderTotalAmount, setorderTotalAmount] = useState("");
  const [orderName, setorderName] = useState("");
  const [trackerId, setTrackerId] = useState("");
  let [itemCount, setItemCopunt] = useState(0);

  let getButtonText = "";
  const handleFirstNameChange = (value) => {
    setFirstName(value);
  };
  const handleLastNameChange = (value) => {
    setLastName(value);
  };
  const handleAddressChange = (value) => {
    setAddress(value);
  };
  const handleCityChange = (value) => {
    setCity(value);
  };
  const handleStateChange = (value) => {
    setRegion(value);
  };
  const handleDeleveriMailChange = (value) => {
    setDeliveryMail(value);
  };
  const handleHomeRadioChange = (value) => {
    if (value === "on") {
      setPlace("HOME");
    }
  };
  const handleWorkRadioChange = (value) => {
    if (value === "on") {
      setPlace("WORK");
    }
  };
  const handleZipChange = (value) => {
    setZIP(value);
  };

  const handleCaptcha = (value) => {
    setcaptchaVerification(value);
  };

  useEffect(() => {
    setUserName(localStorage.getItem("email"));
    getButtonText = sessionStorage.getItem("setButtonText");
    getUserInfo();
    getDeliveryAddress();
    getproductById();
    generateOrderId();
  }, []);

  // get the product by Id
  const getproductById = async () => {
    if (getButtonText !== "PLACE ORDER") {
      const response = await axios.get(
        `https://localhost:7274/api/Products/RetrieveProductList/products?ProductId=${params.productId}`
      );
      setProductById(response.data.result);
      for (let i = 0; i < response.data.result.length; i++) {
        priceofProduct = response.data.result[i].productPrice;
        setSubTotal = response.data.result[i].productDiscount;
        setActualPrice(priceofProduct);
        setAfterDiscount(setSubTotal);
      }
      setProductId(response.data.result);
    } else {
      const response = await axios.get(
        `https://localhost:7274/api/Cart/RetrieveCartDetails/cart?UserName=${localStorage.getItem(
          "email"
        )}`
      );
      setProductById(response.data.result);
      for (let i = 0; i < response.data.result.length; i++) {
        priceofProduct = priceofProduct + response.data.result[i].productPrice;
        setSubTotal = setSubTotal + response.data.result[i].productDiscount;
        setActualPrice(priceofProduct);
        setAfterDiscount(setSubTotal);
        setItemCopunt(response.data.result.length);
        setorderProductName(response.data.result[i].productName);
        setorderProductDescription(response.data.result[i].productDescription);
        setorderProductPrice(response.data.result[i].productPrice);
        setorderProductDiscount(response.data.result[i].productDiscount);
        setorderProductImageurl(response.data.result[i].productImageurl);
        setorderStatus(response.data.result[i].status);
        setorderCategory(response.data.result[i].category);
        setorderSubCategory(response.data.result[i].subCategory);
        setorderType(response.data.result[i].type);
        setorderColor(response.data.result[i].color);
        setorderMaterial(response.data.result[i].material);
        setorderBrand(response.data.result[i].brands);
        setorderSize(response.data.result[i].size);
        setorderRating(response.data.result[i].rating);
        setorderProductId(response.data.result[i].productId);
        setorderCount(i);
        setorderTotalAmount(response.data.result[i].productDiscount * i);
      }
      setProductId(response.data.result);
    }
  };
  // method to generate the captcha code
  function generateCaptcha() {
    let digits = "1234567890";
    let cap = "";
    for (let i = 0; i < 6; i++) {
      let store = digits.charAt(Math.floor(Math.random() * digits.length));
      cap += store;
      setCaptcha(cap);
    }
  }

  // method to genetare the product tracker id
  function generateOrderId() {
    let digits = "1234567890";
    let cap = "";
    for (let i = 0; i < 14; i++) {
      let store = digits.charAt(Math.floor(Math.random() * digits.length));
      cap += store;
      setTrackerId("OD" + cap + "0000");
    }
  }

  // method to get the user information
  const getUserInfo = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Account/RetrieveUserDetails/email/${userEmail}/users`
    );
    setUserInfo(response.data.result[0]);
    setorderMobile(response.data.result[0].mobileNumber);
    setorderName(
      response.data.result[0].firstName + response.data.result[0].lastName
    );
  };

  const handleChange = () => {
    if (count > 1) {
      setState(false);
    }
  };

  // method to remove the product from orders
  const handleRemoveFromCart = (productId) => {
    const url = `https://localhost:7274/api/Cart/RemoveProduct/product-id/${productId}/cart`;
    axios
      .delete(url)
      .then((result) => {
        alert(result.data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  // method to add new address
  function handleAddress() {
    setNewAddress(true);
    if (newAddress === true) {
      setNewAddress(false);
    } else {
      setNewAddress(true);
    }
  }

  // method to checkout with Debit or credit card
  function handleDebitCreditCard() {
    setDebitCreditCard(true);
    setPaymentUPI(false);
    setGooglepay(false);
    setCashOnDelivery(false);
  }

  // method to checkout with UPI method
  function handleUPIPayment() {
    setPaymentUPI(true);
    setGooglepay(false);
    setCashOnDelivery(false);
    setDebitCreditCard(false);
  }

  // method to checkout with Google pay
  function handleGooglePay() {
    setGooglepay(true);
    setPaymentUPI(false);
    setCashOnDelivery(false);
    setDebitCreditCard(false);
  }

  // method to checkout with cash on delivery
  function handleCashOnDelivery() {
    setCashOnDelivery(true);
    setGooglepay(false);
    setPaymentUPI(false);
    setDebitCreditCard(false);
  }
  function handleStep4() {
    setStep1(false);
    setStep2(false);
    setStep3(false);
    setStep4(true);
    generateCaptcha();
  }
  function handleStep3() {
    setStep1(false);
    setStep2(false);
    setStep3(true);
    setStep4(false);
  }
  function handleStep2() {
    setStep1(false);
    setStep2(true);
    setStep3(false);
    setStep4(false);
  }
  function handleStep1() {
    setStep1(true);
    setStep2(false);
    setStep3(false);
    setStep4(false);
  }
  function handleContinueCheckOut() {
    setStep1(false);
    setStep2(true);
    setStep3(false);
    setStep4(false);
  }
  function handleDeliverHere() {
    setStep1(false);
    setStep2(false);
    setStep3(true);
    setStep4(false);
  }
  function handleSummaruContinue() {
    setStep1(false);
    setStep2(false);
    setStep3(false);
    setStep4(true);
    generateCaptcha();
  }
  const handleSaveAddress = () => {
    const data = {
      FirstName: firstName,
      LastName: lastName,
      Address: address,
      City: city,
      State: region,
      DeliveryMail: deliveryMail,
      UserName: dUserName,
      Place: place,
      ZIP: zip,
      errormessage: "",
    };
    const url =
      "https://localhost:7274/api/Account/AddDeleveryAddress/delivery-address";
    axios
      .post(url, data)
      .then((result) => {
        alert(result.data.message);
      })
      .catch((error) => {
        alert(error);
      });
    getDeliveryAddress();
  };
  const getDeliveryAddress = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Account/RetrieveDeliveryAddress/user_name/${userEmail}/delivery_address`
    );
    setDisplayNewAddress(response.data.result[0]);
    setorderAddress(
      response.data.result[0].address +
        response.data.result[0].city +
        response.data.result[0].state +
        response.data.result[0].zip
    );
  };

  // method to send order confirmation mail
  

  const handleCashOnDeliveryContinue = () => {
    if (captchaVerification === captcha) {
      const data = {
        ProductName: orderProductName,
        ProductDescription: orderProductDescription,
        ProductPrice: orderProductPrice,
        ProductDiscount: orderProductDiscount,
        ProductQuanitity: orderProductQuanitity,
        ProductImageurl: orderProductImageurl,
        Status: "Order Confirmed",
        Category: orderCategory,
        SubCategory: orderSubCategory,
        Type: orderType,
        Color: orderColor,
        Material: orderMaterial,
        Brand: orderBrand,
        Size: orderSize,
        rating: orderRating,
        ProductId: orderProductId,
        username: userEmail,
        ShippingCharge: "Free",
        Count: orderCount,
        Address: orderAddress,
        Mobile: orderMobile,
        TotalAmount: orderProductDiscount,
        Name: orderName,
        PaymentMode: "COD",
        OrderTrackId: trackerId,
        PurchaseDate: new Date().toISOString().slice(0, 10),
        errormessage: "",
      };
      const url = "https://localhost:7274/api/Order/PlaceOrder/orders";
      axios
        .post(url, data)
        .then((result) => {
          alert(result.data.message);
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  // method to decrease the products count
  const handleDecrement = () => {
    count > 1 ? setCount(count - 1) : setCount(1);
  };
  return (
    <>
      <section className="py-4" style={{backgroundColor:"#f1f3f6"}}>
        <div className="row gx-4">
          <div className="col-lg-8 mb-4" style={{backgroundColor:"#f1f3f6"}}>
            <div className="px-3 py-2 bg-white" >
              {/* <!-- Pills navs --> */}
              <ul
                className="nav nav-pills nav-justified mb-3"
                id="ex1"
                role="tablist"                
              >
                <li className="nav-item d-flex" role="presentation">
                  <Link
                    className="nav-link d-flex align-items-center justify-content-center w-100"
                    id="ex1-tab-1"
                    data-mdb-toggle="pill"
                    onClick={handleStep1}
                    role="tab"
                    style={{ color: "#20BD99" }}
                  >
                    1 - LOGIN
                  </Link>
                </li>
                <li className="nav-item d-flex" role="presentation">
                  <Link
                    className="nav-link d-flex align-items-center justify-content-center w-100"
                    id="ex1-tab-2"
                    data-mdb-toggle="pill"
                    onClick={handleStep2}
                    role="tab"
                    aria-controls="ex1-pills-2"
                    style={{ color: "#20BD99" }}
                  >
                    2 - DELIVERY ADDRESS
                  </Link>
                </li>
                <li className="nav-item d-flex" role="presentation">
                  <Link
                    className="nav-link d-flex align-items-center justify-content-center w-100"
                    id="ex1-tab-3"
                    data-mdb-toggle="pill"
                    onClick={handleStep3}
                    role="tab"
                    aria-controls="ex1-pills-3"
                    style={{ color: "#20BD99" }}
                  >
                    3 - ORDER SUMMARY
                  </Link>
                </li>
                <li className="nav-item d-flex" role="presentation">
                  <Link
                    className="nav-link d-flex align-items-center justify-content-center w-100"
                    id="ex1-tab-4"
                    data-mdb-toggle="pill"
                    onClick={handleStep4}
                    role="tab"
                    aria-controls="ex1-pills-4"
                    style={{ color: "#20BD99" }}
                  >
                    4 - PAYMENT OPTIONS
                  </Link>
                </li>
              </ul>

              {/* <!-- Pills navs --> */}
              {step1 && (
                <div className="tab-content my-4" id="ex1-content">
                  <div className="container">
                    <p className="mx-4 my-4">
                      Name:{" "}
                      <b>
                        {" "}
                        {userInfo.firstName} {userInfo.lastName}{" "}
                      </b>
                    </p>
                    <p className="mx-4">
                      Phone: <b>{userInfo.mobileNumber}</b>
                    </p>
                    <Link
                      className="mx-4"
                      style={{
                        "text-decoration": "none",
                      }}
                    >
                      Logout & Sign in to another account
                    </Link>
                    <br />
                    <button
                      type="button"
                      style={{
                        borderRadius: "0 0 0 0",
                        width: "365px",
                        backgroundColor: "#fb641b",
                        color: "white",
                      }}
                      className="btn btn-light btn-block mb-4 my-4"
                      onClick={handleContinueCheckOut}
                    >
                      CONTINUE CHECKOUT
                    </button>
                    <p>
                      Please note that upon clicking "Logout" you will lose all
                      items in cart and will be redirected to eCom home page
                    </p>
                  </div>
                </div>
              )}
              {step2 && (
                <div className="container">
                  <Link
                    type="button"
                    className="my-4 mx-4"
                    onClick={handleAddress}
                    style={{
                      "text-decoration": "none",
                      "padding-left": "120px;",
                    }}
                  >
                    <AiOutlinePlusCircle /> Add New Address
                  </Link>
                  {newAddress && (
                    <div className="container py-5">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col">
                          <div className="card my-2 shadow-3">
                            <div className="row g-0">
                              <div className="col-xl-6">
                                <div className="card-body p-md-5 text-black">
                                  <h3 className="mb-4 text-uppercase">
                                    Delivery Info
                                  </h3>

                                  <div className="row">
                                    <div className="col-md-6 mb-4">
                                      <div className="form-outline">
                                        <input
                                          type="text"
                                          id="form3Example1m"
                                          className="form-control form-control-lg"
                                          style={{
                                            borderColor: "black",
                                          }}
                                          onChange={(e) =>
                                            handleFirstNameChange(
                                              e.target.value
                                            )
                                          }
                                        />
                                        <label
                                          className="form-label"
                                          htmlFor="form3Example1m"
                                        >
                                          First name
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                      <div className="form-outline">
                                        <input
                                          type="text"
                                          id="form3Example1n"
                                          className="form-control form-control-lg"
                                          style={{
                                            borderColor: "black",
                                          }}
                                          onChange={(e) =>
                                            handleLastNameChange(e.target.value)
                                          }
                                        />
                                        <label
                                          className="form-label"
                                          htmlFor="form3Example1n"
                                        >
                                          Last name
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-outline mb-4">
                                    <input
                                      type="text"
                                      id="form3Example8"
                                      className="form-control form-control-lg"
                                      style={{
                                        borderColor: "black",
                                      }}
                                      onChange={(e) =>
                                        handleAddressChange(e.target.value)
                                      }
                                    />
                                    <label
                                      className="form-label"
                                      htmlFor="form3Example8"
                                    >
                                      Address
                                    </label>
                                  </div>

                                  <div className="row">
                                    <div className="col-md-6 mb-4 ">
                                      <select
                                        className="select form-control"
                                        style={{
                                          borderColor: "black",
                                        }}
                                        onChange={(e) =>
                                          handleStateChange(e.target.value)
                                        }
                                      >
                                        <option value="1">State</option>
                                        <option value="2">Option 1</option>
                                        <option value="3">Option 2</option>
                                        <option value="4">Option 3</option>
                                      </select>
                                    </div>
                                    <div className="col-md-6 mb-4 ">
                                      <select
                                        className="select form-control"
                                        style={{
                                          borderColor: "black",
                                        }}
                                        onChange={(e) =>
                                          handleCityChange(e.target.value)
                                        }
                                      >
                                        <option value="1">City</option>
                                        <option value="2">Option 1</option>
                                        <option value="3">Option 2</option>
                                        <option value="4">Option 3</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="form-outline mb-4">
                                    <input
                                      type="text"
                                      id="form3Example3"
                                      className="form-control form-control-lg"
                                      style={{
                                        borderColor: "black",
                                      }}
                                      onChange={(e) =>
                                        handleZipChange(e.target.value)
                                      }
                                    />
                                    <label
                                      className="form-label"
                                      htmlFor="form3Example3"
                                    >
                                      Zip
                                    </label>
                                  </div>

                                  <div className="form-outline mb-4">
                                    <input
                                      type="text"
                                      id="form3Example2"
                                      className="form-control form-control-lg"
                                      style={{
                                        borderColor: "black",
                                      }}
                                      onChange={(e) =>
                                        handleDeleveriMailChange(e.target.value)
                                      }
                                    />
                                    <label
                                      className="form-label"
                                      htmlFor="form3Example2"
                                    >
                                      Email
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      id="flextRadioDefault1"
                                      name="flextRadioDefault"
                                      className="form-check-input"
                                      style={{
                                        borderColor: "black",
                                      }}
                                      onClick={(e) =>
                                        handleHomeRadioChange(e.target.value)
                                      }
                                      checked
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlhtmlFor="flextRadioDefault1"
                                    >
                                      Home
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      id="flextRadioDefault2"
                                      name="flextRadioDefault"
                                      className="form-check-input"
                                      style={{
                                        borderColor: "black",
                                      }}
                                      onClick={(e) =>
                                        handleWorkRadioChange(e.target.value)
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlhtmlFor="flextRadioDefault2"
                                    >
                                      Work
                                    </label>
                                  </div>
                                  <div className="d-flex justify-content-end pt-3">
                                    <button
                                      type="button"
                                      className="btn btn-light ms-2"
                                      onClick={(e) => handleSaveAddress()}
                                      style={{
                                        borderRadius: "0 0 0 0",
                                        borderColor: "white",
                                        width: "260px",
                                        backgroundColor: "#fb641b",
                                        color: "white",
                                      }}
                                    >
                                      Save Address
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="form-check">
                    <input
                      className="form-check-input my-4 mx-1"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      checked
                    />
                    <label
                      className="form-check-label my-3 mx-4"
                      htmlFor="flexRadioDefault1"
                    >
                      {userInfo.firstName} {userInfo.lastName}
                    </label>
                    <span className="badge badge-success">
                      {displayNewAddress.place}
                    </span>
                    <br />
                    <span>{userInfo.mobileNumber}</span>

                    <p className="my-4">{displayNewAddress.address}</p>
                    <br />
                    <button
                      type="button"
                      style={{
                        borderRadius: "0 0 0 0",
                        width: "365px",
                        backgroundColor: "#fb641b",
                        color: "white",
                      }}
                      className="btn btn-light btn-block mb-4 my-4"
                      onClick={handleDeliverHere}
                    >
                      DELIVER HERE
                    </button>
                  </div>
                </div>
              )}
              {step3 && (
                <section
                  className=" py-4"
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <div className="container">
                    <div className="row gx-4">
                      <div className="col-lg-12 mb-4">
                        <div className=" px-3 py-2 ">
                          {productById.map((data) => {
                            return (
                              <div className="py-1 col-12 mx-1 pull-left">
                                <div className="row justify-content-center mb-3" style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)"}}>
                                  <div className="card mx-1" style={{border:"none"}}>
                                    <div
                                      className="card-body"
                                      key={data.productId}
                                    >
                                      <div className="row">
                                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
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
                                          <h5>
                                            {data.productName.slice(0, 30)}
                                          </h5>

                                          <div className="d-flex flex-row">
                                            <div className="d-flex flex-row align-items-center mb-1">
                                              <h4 className="mb-1 me-1 text-success">
                                                &#8377; {data.productDiscount}
                                              </h4>
                                              <span className="text-danger">
                                                <s>
                                                  &#8377; {data.productPrice}
                                                </s>
                                              </span>
                                            </div>
                                          </div>
                                          <div className="d-flex flex-row">
                                            <b>Size: </b>{" "}
                                            <span> {data.size} </span>
                                          </div>
                                          <div className="d-flex flex-row">
                                            <b>Color:</b>{" "}
                                            <span> {data.color} </span>
                                          </div>
                                          <div className="d-flex flex-row">
                                            <b>Brand:</b>{" "}
                                            <span> {data.brands} </span>
                                          </div>

                                          <div
                                            className="input-group mb-3 my-1"
                                            style={{
                                              display: "flex",
                                            }}
                                          >
                                            <button
                                              className="btn btn-white px-3"
                                              type="button"
                                              style={{
                                                width: "50px",
                                              }}
                                              data-mdb-ripple-color="dark"
                                              disabled={state}
                                              onClick={handleDecrement}
                                            >
                                              <FiMinus />
                                            </button>
                                            <input
                                              type="text"
                                              className="form-control text-center "
                                              aria-label="Example text with button addon"
                                              aria-describedby="button-addon1"
                                              id="countCartSet"
                                              value={count}
                                            />
                                            <button
                                              className="btn btn-white px-3"
                                              type="button"
                                              style={{
                                                width: "50px",
                                              }}
                                              data-mdb-ripple-color="dark"
                                              onClick={() =>
                                                setCount(count + 1)
                                              }
                                            >
                                              <BiPlus />
                                            </button>

                                            <button
                                              className="btn btn-outline-primary btn-sm mt-2 mx-1"
                                              id="btnProductcartRemove"
                                              type="button"
                                              onClick={(e) =>
                                                handleRemoveFromCart(
                                                  data.productId
                                                )
                                              }
                                            >
                                              REMOVE
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*                   */}
                              </div>
                            );
                          })}
                          <div className="row">
                            <div className=" col-lg-4 mb-3 ">
                              <button
                                className="btn btn-light mx-1"
                                onClick={handleSummaruContinue}
                                style={{
                                  width: "763px",
                                  borderRadius: "0 0 0 0",
                                  backgroundColor: "#fb641b",
                                  color: "white",
                                }}
                              >
                                CONTINUE
                              </button>
                            </div>
                            <p>
                              Order confirmation email will be sent on{" "}
                              <b> {userEmail}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step4 && (
                <div className="container">
                  <ul
                    className="list-group list-group-flush"
                    id="ex1"
                    role="tablist"
                  >
                    <li
                      className="list-group-item d-flex  align-items-center px-0"
                      role="presentation"
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          style={{
                            borderColor: "black",
                          }}
                          onClick={handleUPIPayment}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Payment UPI
                        </label>
                      </div>
                    </li>
                    <li
                      className="list-group-item d-flex  align-items-center px-0"
                      role="presentation"
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          style={{
                            borderColor: "black",
                          }}
                          onClick={handleGooglePay}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Google Pay UPI
                        </label>
                      </div>
                      <br />
                      {googlePay && (
                        <div className="row my-4 mx-4">
                          <input
                            className="form-control my-4"
                            type="text"
                            name="text"
                            id="text"
                            style={{
                              borderColor: "black",
                              borderRadius: "0 0 0 0",
                            }}
                          />
                          <button
                            type="submit"
                            className="btn btn-light my-2"
                            style={{
                              borderRadius: "0 0 0 0",
                              backgroundColor: "#fb641b",
                              color: "white",
                            }}
                          >
                            CONTINUE
                          </button>
                        </div>
                      )}
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center px-0"
                      role="presentation"
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          style={{
                            borderColor: "black",
                          }}
                          onClick={handleCashOnDelivery}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                      <br />
                      {cashOnDelivery && (
                        <div className="row" style={{display:"block"}}>
                          <input
                            className="form-control my-4 text-center"
                            type="text"
                            name="text"
                            id="text"
                            value={captcha.replace("undefined", "")}
                            style={{
                              borderColor: "white",
                              borderRadius: "0 0 0 0",
                              backgroundColor: "white",
                              color: "green",
                              fontWeight: "bold",
                              fontSize:"25px"
                            }}
                            disabled
                          />
                          <input
                            className="form-control my-4"
                            placeholder="Enter above captcha code"
                            type="text"
                            name="text"
                            id="text"
                            style={{
                              borderColor: "black",
                              borderRadius: "0 0 0 0",
                            }}
                            onChange={(e) => handleCaptcha(e.target.value)}
                            required="true"
                          />
                          <Link
                            to="/ordersummary"
                            type="submit"
                            className="btn btn-light my-2"
                            style={{
                              borderRadius: "0 0 0 0",
                              backgroundColor: "#fb641b",
                              color: "white",
                            }}
                            onClick={handleCashOnDeliveryContinue}
                          >
                            CONTINUE
                          </Link>
                        </div>
                      )}
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center px-0"
                      role="presentation"
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          style={{
                            borderColor: "black",
                          }}
                          onClick={handleDebitCreditCard}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Credit / Debit / ATM Card
                        </label>
                      </div>
                    </li>
                  </ul>
                  <hr />
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-4 my-1" style={{paddingRight:"28px"}}>
            <div className="card" style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",paddingLeft:"7px",border:"none", borderRadius:"1px" }}>
              <div className="card-body">
                <h5 className="card-title">PRICE DETAILS</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Price ({itemCount})<span>&#8377;{actualPrice}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Discount
                    <span className="text-success">
                      -&#8377;
                      {actualPrice - afterDiscount}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Delivery Charges
                    <span className="text-success">Free</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>&#8377;{afterDiscount}</strong>
                    </span>
                  </li>
                  <hr />
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong className="text-success">
                        {" "}
                        You will save &#8377;
                        {actualPrice - afterDiscount} on this order
                      </strong>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

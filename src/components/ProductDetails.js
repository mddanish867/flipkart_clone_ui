import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BiSolidBolt,
  BiSolidPurchaseTag,
  BiPlus,
  BiMinus,
} from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import "./ProductDetails.css";
import MultiItemCarousel from "./MultiItemCarousel";
import Swal from "sweetalert2";
import Carousel from "react-multi-carousel";
import PostQuestions from "./Popups/PostQuestions";
import { BsHeart } from "react-icons/bs";

export default function ProductDetails() {
  let params = useParams();
  let navigate = useNavigate();
  const [getProductId, setProductId] = useState([]);
  let [ProductImage, setProductimage] = useState([]);
  const [userName, setUserName] = useState("");
  let [stockCount, setstockCount] = useState(0);
  const [recommendation, setRecommendation] = useState([]);
  let sub = "";
  const [existingProductId, setExistingProductId] = useState(0);
  const [orderAddress, setorderAddress] = useState("");
  let [displayNewAddress, setDisplayNewAddress] = useState("");
  const [showProductDetails, setshowProductDetails] = useState(false);
  const [totalRatings, setTotalRatings] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDetails, setRatingDetails] = useState([]);
  const [visible, setvisible] = useState(3);
  const [getProductQuestionair, setProductQuestionair] = useState([]);
  const [visibleTop3Question, setvisibleTop3Question] = useState(3);
  const [productdata, setProductData] = useState([]);
  const [showModel, setShowwModel] = useState(false);
  const [mensCategory, setMensCategory] = useState([]);
  const [boughtTogetherProduct, setBoughtTogetherProduct] = useState(3);
  let sumOfAllRating = 0;
  let totalRatingCount = 0;
  let totalReviewCount = 0;
  let averageratingCount = 0;

  useEffect(() => {
    setUserName(localStorage.getItem("email"));
    getproductData();
    getproductimage();
    checkExistingProduct();
    getDeliveryAddress();
    getRatingReviews();
    getRatingReviewDetails();
    getProeductQuestionair();
    productBoughtData();
  }, []);

  const productBoughtData = async () => {
    const response = await axios.get(
      "https://localhost:7274/api/Products/RetrieveProductList/products?Category=Mens%20Wear"
    );
    setMensCategory(response.data.result);
  };

  // ================== start method to get all product question and answers for perticular product ========================
  const getProeductQuestionair = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductQuestionair/product-id/${params.productId}/product-questionair-details`
    );
    setProductQuestionair(response.data.result);
  };
  // ================== End method to get all product question and answers for perticular product ========================

  // ================== Start method to get all product rating ang and review details ====================================
  const getRatingReviewDetails = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductRatingDetails/product-id/${params.productId}/rating-reviews-details`
    );
    setRatingDetails(response.data.result);
  };
  // ================== End method to get all product rating ang and review details ======================================

  // ============= Start method to get all product rating and reviews for perticular product =============================
  const getRatingReviews = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductRatings/product-id/${params.productId}/rating-reviews`
    );
    for (let i = 0; i < response.data.result.length; i++) {
      sumOfAllRating = sumOfAllRating + response.data.result[i].rating;
      totalRatingCount = response.data.result.length;
      totalReviewCount = response.data.result.length;
      averageratingCount = (
        sumOfAllRating / response.data.result.length
      ).toFixed(1);
    }
    setTotalRatings(totalRatingCount);
    setTotalReviews(totalReviewCount);
    setAverageRating(averageratingCount);
  };
  // ============= End method to get all product rating and reviews for perticular product ===============================

  // ================================ Start method to get delivery address of customer ===================================
  const getDeliveryAddress = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Account/RetrieveDeliveryAddress/user_name/${localStorage.getItem(
        "email"
      )}/delivery_address`
    );
    setDisplayNewAddress(response.data.result[0]);
    setorderAddress(
      response.data.result[0].address +
        response.data.result[0].city +
        response.data.result[0].state +
        response.data.result[0].zip
    );
  };
  // ================================ End method to get delivery address of customer =====================================

  // ====================== Start method to get all product images based on Id ===========================================
  const getproductimage = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductDetails/id/${params.productId}/products`
    );
    setProductimage(response.data.result);
  };
  // ====================== End method to get all product images based on Id =============================================

  // =============================== Start method to get product based on id =============================================
  const getproductData = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductList/products?ProductId=${params.productId}`
    );
    setProductId(response.data.result);
    setstockCount(response.data.result[0].productQuanitity);
    sub = response.data.result[0].subCategory;
    recommendedPrudtcs();
  };
  // =============================== End method to get product based on id ===============================================

  // =============================== Start method to get recommended product based on selection ==========================
  const recommendedPrudtcs = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductList/products?SubCategory=${sub}`
    );
    setRecommendation(response.data.result);
    // Simialr product based on selected product
    setProductData(response.data.result);
  };
  // =============================== End method to get recommended product based on selection ============================

  // =============================== Start method to check if the products is already exists into cart or not ============
  const checkExistingProduct = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Cart/RetrieveCartDetails/cart?ProductId=${params.productId}`
    );
    setExistingProductId(response.data.result[0].productId);
  };
  // =============================== End method to check if the products is already exists into cart or not ==============

  // method to decrease the products count

  // const handleDecrement = () => {
  //   count > 1 ? setCount(count - 1) : setCount(1);
  // };

  // method to increse the products count
  // const handleIncrement = () => {
  //   count < stockCount ? setCount(count + 1) : setCount(stockCount);
  // };

  // =================================== Start Method to add the products ino cart =============================
  const handleAddToCart = () => {
    let flag = false;
    if (existingProductId.toString() === params.productId) {
      flag = true;
    }

    if (flag === false) {
      const data = {
        ProductId: params.productId,
        UserName: userName,
        errormessage: "",
      };
      const url = "https://localhost:7274/api/Cart/AddProduct/Cart";
      axios
        .post(url, data)
        .then((result) => {
          console.log(data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: result.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          if (result.data.message === "OK") {
            window.location.reload();
            navigate("/cart");
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: { error },
          });
        });
    }
  };
  // =================================== End Method to add the products ino cart ===============================

  // =================================== Start method to save product into wishlist ============================
  const handeSavetoFavurite = () => {
    if (userName === "" || userName === null || userName === undefined) {
      navigate("/signin");
    } else {
      const data = {
        ProductId: params.productId,
        UserName: userName,
      };
      const url =
        "https://localhost:7274/api/Products/AddProductstoFavourite/favourites";
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
  // =================================== End method to save product into wishlist ==============================

  // =================================== Start method to show product details ==================================
  function showDetails() {
    if (showProductDetails === false) {
      setshowProductDetails(true);
    } else {
      setshowProductDetails(false);
    }
  }
  // =================================== End method to show product details ====================================

  // =================================== Start method to handle product rating =================================
  const handleRateProduct = () => {
    if (
      localStorage.getItem("email") === "" ||
      localStorage.getItem("email") === undefined ||
      localStorage.getItem("email") === null
    ) {
      navigate("/signin");
    } else {
      navigate("ratingandreviews");
    }
  };
  // =================================== End method to handle product rating ===================================

  // ======================================== Start Similar product ========================================
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const product = productdata.map((data) => (
    <div className="container" key={data.productId}>
      <Link
        to={`/productdetails/${data.productId}`}
        id="productLink"
        target="_blank"
      >
        <div
          className="card bg-body rounded"
          style={{ border: "none", width: "180px", height: "190px" }}
        >
          <div className="d-flex justify-content-between p-2">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                border: 0,
                borderRadius: "0 0 0 0",
                marginLeft: "160px",
              }}
            >
              <Link
                className="btn btn-white px-2"
                type="button"
                id="button-addon1"
                data-mdb-ripple-color="white"
              >
                <BsHeart style={{ color: "gray" }} />
              </Link>
            </div>
          </div>
          <img
            src={data.productImageurl}
            className="card-img-top"
            alt="Laptop"
            id="cardImage"
            style={{ height: "170px", width: "200px" }}
          />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p className="small">
                <a
                  href="/productdetails"
                  className="text-muted"
                  id="productName"
                >
                  {data.productName.slice(0, 18)}...
                </a>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));
  // ========================================== End Simialr product ==========================================

  // ========================================== Start method to open Product Question component ==============
  const closeModel = () => setShowwModel(false);
  // ========================================== End method to open Product Question component ================

  // ==========================================                         ======================================
  // Method to add the products ino favourites
  // const handleWishList = (productId) => {
  //   let flag = false;
  //     if (existingProductId.toString() === params.productId) {
  //       flag = true;
  //     }

  //   if (flag === false) {
  //     const data = {
  //       ProductId: productId,
  //       UserName: username,
  //       errormessage: "",
  //     };
  //     const url = "https://localhost:7274/api/Products/AddProductstoFavourite/favourites";
  //     axios
  //       .post(url, data)
  //       .then((result) => {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: (result.data.message),
  //           showConfirmButton: false,
  //           timer: 1500
  //         })
  //         if (result.data.message === "OK") {
  //           window.location.reload();
  //           navigate("/wishlist");
  //         }
  //       })
  //       .catch((error) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Something went wrong!',
  //           footer: {error}
  //         })
  //       });
  //   }
  // };

  return (
    <>
      <div>
        <div className="row">
          <div
            className="col-2"
            style={{ marginTop: "0", backgroundColor: "#fff" }}
          >
            <div
              className="container"
              style={{ marginLeft: "-45px", marginTop: "4px" }}
            >
              {ProductImage.map((data) => {
                return (
                  <div className="row imgRowDetails" key={data.imageId}>
                    <div className="column imgClmDetails">
                      <div className="d-flex justify-content-center mb-3">
                        <a
                          data-fslightbox="mygalley"
                          className="border mx-1 item-thumb"
                          target=""
                          data-type="image"
                          style={{ borderRadius: "0 0 0 0" }}
                        >
                          <img
                            width="60"
                            height="60"
                            className="rounded-2"
                            src={data.imageUrl}
                            alt="No image found"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {getProductId.map((data) => {
            return (
              <div
                className="col-10"
                style={{ backgroundColor: "#fff" }}
                key={data.productId}
              >
                <section className="py-5" style={{ marginLeft: "-40px" }}>
                  <div className="container">
                    <div className="row">
                      <aside
                        className="col-lg-4 my-1"
                        style={{
                          marginLeft: "-96px",
                          width: "440px",
                          height: "550px",
                          marginTop: "-54px",
                        }}
                      >
                        <div
                          className="border mb-3 d-flex justify-content-center"
                          style={{
                            borderRadius: "0 0 0 0",
                            marginTop: "-43px",
                            height: "400px",
                            width: "408px",
                          }}
                        >
                          <Link
                            data-fslightbox="mygalley"
                            className="rounded-4"
                            target="/"
                            data-type="image"
                            to=""
                          >
                            <img
                              className="rounded-4 fit"
                              id="productdetails1"
                              src={data.productImageurl}
                              alt=""
                              style={{ height: "400px" }}
                            />
                          </Link>
                        </div>
                        <br />
                        <br />
                        <div
                          style={{
                            display: "flex",
                            marginLeft: "-128px",
                            justifyContent: "center",
                            marginTop: "-54px",
                          }}
                        >
                          <Link
                            className="btn btn-primary shadow-0 align-self-start mr-auto"
                            id="btnAddToCartProduct"
                            to="/cart"
                            onClick={(e) => handleAddToCart()}
                            style={{
                              width: "220px",
                              height: "60px",
                              textAlign: "center",
                              padding: "15px",
                            }}
                          >
                            <FaShoppingCart
                              style={{
                                marginRight: "3px",
                                marginBottom: "5px",
                              }}
                            />
                            ADD TO CART
                          </Link>
                          <Link
                            to={
                              userName !== null
                                ? `/order/${params.productId}`
                                : `/signin`
                            }
                            className="btn btn-warning shadow-0 mx-2"
                            id="buyNowProduct"
                            style={{
                              width: "220px",
                              height: "60px",
                              padding: "15px",
                            }}
                          >
                            <BiSolidBolt />
                            BUY NOW
                          </Link>
                        </div>

                        {/* <!-- thumbs-wrap.// --> */}
                        {/* <!-- gallery-wrap .end// --> */}
                      </aside>
                      <main
                        className="col-lg-8"
                        style={{ marginLeft: "-26px" }}
                      >
                        <div className="ps-lg-3">
                          <h6 className="title text-dark">
                            {data.productName}
                          </h6>

                          <div className="mb-3">
                            <span className="h3">
                              &#8377;{data.productDiscount}.00
                            </span>
                            <del className="text-muted mx-2">
                              &#8377;{data.productPrice}.00
                            </del>
                            <span className="text-success mx-2">
                              <b>
                                {(
                                  (data.productDiscount / data.productPrice) *
                                  100
                                ).toFixed(2)}
                                % off
                              </b>
                            </span>
                          </div>
                          <div
                            className="d-flex flex-row my-3"
                            style={{ marginLeft: "-25px" }}
                          >
                            <span
                              className="badge rounded-pill mx-4"
                              style={{
                                width: "65px",
                                height: "28px",
                                backgroundColor: "#26a541",
                                fontSize: "18px",
                              }}
                            >
                              <span>{averageRating}</span>

                              <AiFillStar
                                style={{
                                  height: "18px",
                                  width: "18px",
                                  marginTop: "-4px",
                                }}
                              />
                            </span>
                            <span className="text-muted mx-1">
                              {totalRatings} ratings and {totalReviews} reviews
                            </span>
                          </div>
                          <div className="row" style={{ marginBottom: "5px" }}>
                            <div
                              className="filter-content collapse show"
                              id="collapse_4"
                            >
                              <div className="card-body">
                                Size
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="options-outlined"
                                  id="primary-outlined-xs"
                                  autoComplete="off"
                                />
                                <label
                                  className="btn btn-outline-primary mx-2"
                                  htmlFor="primary-outlined-xs"
                                  style={{
                                    borderRadius: "0 0 0 0",
                                    width: "50px",
                                    border: "2px solid",
                                  }}
                                >
                                  XS
                                </label>
                                <input
                                  type="radio"
                                  className="btn-check "
                                  name="options-outlined"
                                  id="primary-outlined-s"
                                  autoComplete="off"
                                />
                                <label
                                  className="btn btn-outline-primary mx-2"
                                  htmlFor="primary-outlined-s"
                                  style={{
                                    borderRadius: "0 0 0 0",
                                    width: "50px",
                                    border: "2px solid",
                                  }}
                                >
                                  S
                                </label>
                                <input
                                  type="radio"
                                  className="btn-check "
                                  name="options-outlined"
                                  id="primary-outlined-l"
                                  autoComplete="off"
                                />
                                <label
                                  className="btn btn-outline-primary mx-2"
                                  htmlFor="primary-outlined-l"
                                  style={{
                                    borderRadius: "0 0 0 0",
                                    width: "50px",
                                    border: "2px solid",
                                  }}
                                >
                                  L
                                </label>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="options-outlined"
                                  id="primary-outlined-xl"
                                  autoComplete="off"
                                />
                                <label
                                  className="btn btn-outline-primary mx-2"
                                  htmlFor="primary-outlined-xl"
                                  style={{
                                    borderRadius: "0 0 0 0",
                                    width: "50px",
                                    border: "2px solid",
                                  }}
                                >
                                  XL
                                </label>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="options-outlined"
                                  id="primary-outlined-xxl"
                                  autoComplete="off"
                                />
                                <label
                                  className="btn btn-outline-primary mx-2"
                                  htmlFor="primary-outlined-xxl"
                                  style={{
                                    borderRadius: "0 0 0 0",
                                    width: "50px",
                                    border: "2px solid",
                                  }}
                                >
                                  XXL
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row" style={{ marginBottom: "5px" }}>
                            <div
                              className="filter-content collapse show"
                              id="collapse_4"
                              style={{ display: "flex" }}
                            >
                              Color
                              {ProductImage.map((data) => {
                                return (
                                  <div key={data.imageId}>
                                    <input
                                      type="radio"
                                      className="btn-check"
                                      name="outlined"
                                      id={data.imageUrl}
                                      autoComplete="off"
                                    />
                                    <label
                                      className="btn btn-light mx-2"
                                      htmlFor={data.imageUrl}
                                      style={{
                                        borderRadius: "0 0 0 0",
                                        width: "40px",
                                        display: "inline-table",
                                        border: "2px solid blue",
                                      }}
                                    >
                                      <img
                                        width="60"
                                        height="60"
                                        className="rounded-2"
                                        src={data.imageUrl}
                                        alt=""
                                      />
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <h6>Available offers</h6>
                          <div className="row">
                            <dd className="col-12">
                              <BiSolidPurchaseTag style={{ color: "green" }} />{" "}
                              Bank Offer10% Instant Discount on ICICI Bank
                              Credit Card, up to ₹1250 on orders
                            </dd>
                            <dd className="col-12">
                              <BiSolidPurchaseTag style={{ color: "green" }} />{" "}
                              Bank Offer10% Instant Discount on ICICI Bank
                              Credit Card, up to ₹1250 on orders
                            </dd>
                            <dd className="col-12">
                              <BiSolidPurchaseTag style={{ color: "green" }} />{" "}
                              Bank Offer10% Instant Discount on ICICI Bank
                              Credit Card, up to ₹1250 on orders
                            </dd>
                            <dd className="col-12">
                              <BiSolidPurchaseTag style={{ color: "green" }} />{" "}
                              Bank Offer10% Instant Discount on ICICI Bank
                              Credit Card, up to ₹1250 on orders
                            </dd>
                          </div>
                          <h6 className="text-muted my-4">
                            <MdLocationPin style={{ color: "green" }} /> Deliver
                            to
                          </h6>
                          <div
                            className="border"
                            style={{
                              height: "49px",
                              padding: "12px",
                              width: "460px",
                            }}
                          >
                            {orderAddress.slice(0, 50)}...
                            <span
                              className="badge badge-secondary"
                              style={{
                                color: "green",
                                backgroundColor: "white",
                              }}
                            >
                              {displayNewAddress.place}
                            </span>
                          </div>
                          <hr />

                          <div style={{ display: "flex" }}>
                            <h4 className="my-4">Product Details</h4>
                            {!showProductDetails ? (
                              <button
                                style={{
                                  border: "none",
                                  backgroundColor: "#fff",
                                  marginLeft: "474px",
                                }}
                                onClick={showDetails}
                              >
                                <BiPlus
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    color: "gray",
                                  }}
                                />
                              </button>
                            ) : (
                              <button
                                style={{
                                  border: "none",
                                  backgroundColor: "#fff",
                                  marginLeft: "474px",
                                }}
                                onClick={showDetails}
                              >
                                <BiMinus
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    color: "gray",
                                  }}
                                />
                              </button>
                            )}
                          </div>
                          {showProductDetails ? (
                            <div>
                              <p className="my-3">{data.productDescription}</p>

                              <div className="row">
                                <dt className="col-3">Type:</dt>
                                <dd className="col-9">{data.type}</dd>

                                <dt className="col-3">Color:</dt>
                                <dd className="col-9">{data.color}</dd>

                                <dt className="col-3">Material:</dt>
                                <dd className="col-9">{data.material}</dd>

                                <dt className="col-3">Brand:</dt>
                                <dd className="col-9">{data.brands}</dd>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <hr />

                          <div style={{ display: "flex" }}>
                            <h4 style={{ marginTop: "11px" }}>
                              Ratings & Reviews
                            </h4>
                            <span
                              className="badge rounded-pill mx-4"
                              style={{
                                width: "65px",
                                height: "34px",
                                marginTop: "7px",
                                paddingTop: "8px",
                                backgroundColor: "#26a541",
                                fontSize: "18px",
                              }}
                            >
                              {averageRating}
                              <AiFillStar
                                style={{ height: "18px", width: "18px" }}
                              />
                            </span>
                            <span
                              className="text-muted mx-1"
                              style={{ marginTop: "11px" }}
                            >
                              {totalRatings} ratings and {totalReviews} reviews
                            </span>
                            <Link
                              style={{
                                backgroundColor: "#2874f0",
                                color: "#fff",
                                border: "none",
                                marginLeft: "52px",
                                fontWeight: 600,
                                fontFamily: "Roboto,Arial,sans-serif",
                                fontSize: "14px",
                                height: "34px",
                                width: "114px",
                                marginTop: "11px",
                                textDecoration: "none",
                                textAlign: "center",
                                paddingTop: "6px",
                              }}
                              to={`/ratingandreviews/${data.productId}`}
                              onClick={handleRateProduct}
                            >
                              Rate Product
                            </Link>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              alignContent: "space-between",
                              marginTop: "10px",
                            }}
                          >
                            <HiOutlineEmojiHappy
                              style={{
                                color: "green",
                                height: "25px",
                                width: "25px",
                              }}
                            />
                            <button
                              className="mx-2"
                              style={{
                                border: "none",
                                backgroundColor: "#fff",
                                boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
                                outline: "none",
                                fontSize: "14px",
                              }}
                            >
                              Colour
                            </button>
                            <button
                              className="mx-2"
                              style={{
                                border: "none",
                                backgroundColor: "#fff",
                                boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
                                outline: "none",
                                fontSize: "14px",
                              }}
                            >
                              Style
                            </button>
                            <button
                              className="mx-2"
                              style={{
                                border: "none",
                                backgroundColor: "#fff",
                                boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
                                outline: "none",
                                fontSize: "14px",
                              }}
                            >
                              Comfort
                            </button>
                            <button
                              className="mx-2"
                              style={{
                                border: "none",
                                backgroundColor: "#fff",
                                boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
                                outline: "none",
                                fontSize: "14px",
                              }}
                            >
                              Fabrick
                            </button>
                          </div>
                          <h6 className="my-4">
                            Images uploaded by customers:
                          </h6>

                          {ratingDetails.slice(0, visible).map((data) => {
                            return (
                              <div key={data.ratingId}>
                                <div
                                  style={{
                                    display: "flex",
                                    marginLeft: "-25px",
                                  }}
                                >
                                  {data.rating === 1 ? (
                                    <span
                                      className="badge rounded-pill mx-4"
                                      style={{
                                        width: "37px",
                                        height: "19px",
                                        marginTop: "7px",
                                        paddingTop: "4px",
                                        backgroundColor: "#ff6161",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {data.rating}
                                      <AiFillStar
                                        style={{
                                          height: "12px",
                                          width: "12px",
                                          marginTop: "-3px",
                                        }}
                                      />
                                    </span>
                                  ) : (
                                    <span
                                      className="badge rounded-pill mx-4"
                                      style={{
                                        width: "37px",
                                        height: "19px",
                                        marginTop: "7px",
                                        paddingTop: "4px",
                                        backgroundColor: "#26a541",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {data.rating}
                                      <AiFillStar
                                        style={{
                                          height: "12px",
                                          width: "12px",
                                          marginTop: "-3px",
                                        }}
                                      />
                                    </span>
                                  )}

                                  <p
                                    style={{
                                      marginLeft: "-12px",
                                      marginTop: "5px",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {data.review}
                                  </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                  <p
                                    className="mx-2"
                                    style={{
                                      fontWeight: "400px",
                                      color: "gray",
                                    }}
                                  >
                                    {data.customerName}
                                  </p>
                                  <p className="mx-2">{data.reviewedAt}</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                  <IoIosCheckmarkCircle
                                    style={{ color: "gray" }}
                                  />
                                  <p
                                    className="mx-1"
                                    style={{ marginTop: "-5px", color: "gray" }}
                                  >
                                    Certified Buyer, {data.city}
                                  </p>
                                </div>
                                <hr />
                              </div>
                            );
                          })}
                          {visible === 3 ? (
                            <Link
                              to={`/productreview/${data.productId}`}
                              style={{
                                textDecoration: "none",
                                fontWeight: 500,
                              }}
                            >
                              All {totalRatings} reviews <FaAngleRight />
                            </Link>
                          ) : (
                            ""
                          )}

                          <h4 className="my-4">Question & Answers</h4>
                          {getProductQuestionair
                            .slice(0, visibleTop3Question)
                            .map((data) => {
                              return (
                                <div key={data.questionId}>
                                  <h6 className="my-4">Q: {data.questions}?</h6>
                                  <p style={{ marginTop: "-10px" }}>
                                    A: {data.answers}
                                  </p>
                                  <div style={{ display: "flex" }}>
                                    <IoIosCheckmarkCircle
                                      style={{ color: "gray" }}
                                    />
                                    <p
                                      className="mx-1"
                                      style={{
                                        marginTop: "-5px",
                                        color: "gray",
                                      }}
                                    >
                                      Certified Buyer
                                    </p>
                                  </div>
                                  <hr />
                                </div>
                              );
                            })}
                          <Link
                            to={`/productquestions/${data.productId}`}
                            style={{
                              textDecoration: "none",
                              fontWeight: 500,
                            }}
                          >
                            All questions <FaAngleRight />
                          </Link>
                          <div style={{ display: "flex" }}>
                            <h6 style={{ width: "275px" }} className="my-2">
                              Have doubts regarding this product?
                            </h6>
                            <button
                              style={{
                                boxShadow: "none",
                                border: "none",
                                color: "#fff",
                                fontSize: "14px",
                                width: "auto",
                                padding: "8px 16px",
                                backgroundColor: "#2874f0",
                                cursor: "pointer",
                                textTransform: "capitalize",
                                fontWeight: 500,
                                marginLeft: "250px",
                                borderRadius: "2px",
                              }}
                              onClick={() => setShowwModel(true)}
                            >
                              Post Your Question
                            </button>
                            {showModel && (
                              <PostQuestions closeModel={closeModel} />
                            )}
                          </div>
                        </div>
                      </main>
                    </div>
                  </div>
                </section>
              </div>
            );
          })}
        </div>
        {/* Start Bind the Product based on the filters */}
        <main
          className="col-md-12 my-2"
          style={{ backgroundColor: "#fff", width: "1263px" }}
        >
          <h4>Frequently bought together</h4>
          <section id="mensSection my-1" style={{ display: "flex" }}>
            <div className="row">
              {getProductId.map((data) => {
                return (
                  <div
                    className=" col-12 col-md-12 col-lg-4 mb-4"
                    id="roundedCircle"
                    style={{ marginRight: "-23px", width: "290px" }}
                  >
                    <Link
                      to={`/productdetails/${data.productId}`}
                      id="productLink"
                      target="-blank"
                      key={data.productId}
                    >
                      <div className="card bg-body" style={{ border: 0 }}>
                        <div className="d-flex justify-content-between p-2">
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              border: 0,
                              borderRadius: "0 0 0 0",
                              marginLeft: "185px",
                            }}
                          >
                           <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
</div>
                          </div>
                        </div>
                        <img
                          src={data.productImageurl}
                          className="card-img-top"
                          alt="Laptop"
                          id="cardImage"
                        />
                        <div className="card-body">
                          <div className="justify-content-between">
                            <h6 className="text-muted">
                              {data.productName.slice(0, 18)}
                            </h6>
                            <p className="mb-0" id="prodcutDesc">
                              {data.productDescription.slice(0, 18)}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mb-3">
                            <h5 className="text-dark mb-0">
                              &#8377;{data.productDiscount}
                            </h5>
                            <p className="small text-muted">
                              <s>&#8377;{data.productPrice}</s>
                            </p>
                            <p className="small text-success">
                              <b>
                                &#8377;
                                {(
                                  (data.productDiscount / data.productPrice) *
                                  100
                                ).toFixed(2)}{" "}
                                off
                              </b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div
              style={{ marginTop: "170px", width: "30px", marginLeft: "20px" }}
            >
              <FaPlus />
            </div>
            <div className="row">
              {getProductId.map((data) => {
                return (
                  <div
                    className=" col-12 col-md-12 col-lg-4 mb-4"
                    id="roundedCircle"
                    style={{ marginRight: "-23px", width: "290px" }}
                  >
                    <Link
                      to={`/productdetails/${data.productId}`}
                      id="productLink"
                      target="-blank"
                      key={data.productId}
                    >
                      <div className="card bg-body" style={{ border: 0 }}>
                        <div className="d-flex justify-content-between p-2">
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              border: 0,
                              borderRadius: "0 0 0 0",
                              marginLeft: "185px",
                            }}
                          >
                            <Link
                              className="btn btn-white px-2"
                              type="button"
                              id="button-addon1"
                              data-mdb-ripple-color="white"
                            >
                              <BsHeart style={{ color: "gray" }} />
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
                          <div className="justify-content-between">
                            <h6 className="text-muted">
                              {data.productName.slice(0, 18)}
                            </h6>
                            <p className="mb-0" id="prodcutDesc">
                              {data.productDescription.slice(0, 18)}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mb-3">
                            <h5 className="text-dark mb-0">
                              &#8377;{data.productDiscount}
                            </h5>
                            <p className="small text-muted">
                              <s>&#8377;{data.productPrice}</s>
                            </p>
                            <p className="small text-success">
                              <b>
                                &#8377;
                                {(
                                  (data.productDiscount / data.productPrice) *
                                  100
                                ).toFixed(2)}{" "}
                                off
                              </b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div
              style={{ marginTop: "170px", width: "30px", marginLeft: "20px" }}
            >
              <FaPlus />
            </div>
            <div className="row">
              {getProductId.map((data) => {
                return (
                  <div
                    className=" col-12 col-md-12 col-lg-4 mb-4"
                    id="roundedCircle"
                    style={{ marginRight: "-23px", width: "290px" }}
                  >
                    <Link
                      to={`/productdetails/${data.productId}`}
                      id="productLink"
                      target="-blank"
                      key={data.productId}
                    >
                      <div className="card bg-body" style={{ border: 0 }}>
                        <div className="d-flex justify-content-between p-2">
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              border: 0,
                              borderRadius: "0 0 0 0",
                              marginLeft: "185px",
                            }}
                          >
                            <Link
                              className="btn btn-white px-2"
                              type="button"
                              id="button-addon1"
                              data-mdb-ripple-color="white"
                            >
                              <BsHeart style={{ color: "gray" }} />
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
                          <div className="justify-content-between">
                            <h6 className="text-muted">
                              {data.productName.slice(0, 18)}
                            </h6>
                            <p className="mb-0" id="prodcutDesc">
                              {data.productDescription.slice(0, 18)}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mb-3">
                            <h5 className="text-dark mb-0">
                              &#8377;{data.productDiscount}
                            </h5>
                            <p className="small text-muted">
                              <s>&#8377;{data.productPrice}</s>
                            </p>
                            <p className="small text-success">
                              <b>
                                &#8377;
                                {(
                                  (data.productDiscount / data.productPrice) *
                                  100
                                ).toFixed(2)}{" "}
                                off
                              </b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div
              style={{ width: "350px", marginLeft: "40px", marginTop: "20px" }}
            >
              <h6 style={{ color: "#878787", fontSize: "14px" }}>
                {" "}
                Price Summary
              </h6>
              <hr style={{ border: "1px dashed #878787" }} />
              <p className="my-4" style={{ fontSize: "20px" }}>
                Main Product Selected{" "}
                <span style={{ marginLeft: "100px" }}>189</span>
              </p>
              <p className="my-4" style={{ fontSize: "20px" }}>
                2 Addons Selected{" "}
                <span style={{ marginLeft: "138px" }}>340</span>
              </p>
              <hr style={{ border: "1px dashed #878787" }} />
              <h6 style={{ fontSize: "20px" }}>
                Total <span style={{ marginLeft: "257px" }}>540</span>
              </h6>

              <button
                style={{
                  boxShadow: "0 1px 2px 0 rgba(0,0,0,.26)",
                  border: "none",
                  color: "#fff",
                  fontSize: "16px",
                  width: "350px",
                  padding: "16px 0",
                  backgroundColor: "#ff9f00",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  marginTop: "75px",
                }}
              >
                ADD 3 ITEMS TO CART
              </button>
            </div>
          </section>
        </main>
        {/* End Bind the Product based on the filters */}
        <div>
          <div
            style={{
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
              marginTop: "10px",
              backgroundColor: "#fff",
              height: "300px",
              marginLeft: "16px",
              marginRight: "16px",
            }}
          >
            <h4 style={{ marginLeft: "16px" }}> Similar Items #</h4>
            <button
              style={{
                backgroundColor: "#0d6efd",
                marginLeft: "1120px",
                border: 0,
                color: "#fff",
              }}
            >
              View All <FaAngleRight />
            </button>
            <Carousel responsive={responsive}>{product}</Carousel>;
          </div>
        </div>
        <div>
          {/* <h4 className="mx-4">Frequently bought together</h4> */}
          <MultiItemCarousel />
        </div>
        <div>
          {/* <h4 className="mx-4">You might be interested in</h4> */}
          <MultiItemCarousel />
        </div>
        <div>
          {/* <h4 className="mx-4"> Bought together</h4> */}
          <MultiItemCarousel />
        </div>
        <div>
          {/* <h4 className="mx-4">Recently viewed</h4> */}
          <MultiItemCarousel />
        </div>

        <section className="bg-light border-top py-4">
          <div className="container">
            <div className="row gx-4">
              <div className="col-lg-4">
                <div className="px-0 border rounded-2 shadow-0">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Similar products</h5>

                      {recommendation.map((data) => {
                        return (
                          <div className="d-flex mb-3" key={data.productId}>
                            <a href="!#" className="me-3">
                              <img
                                src={data.productImageurl}
                                id="productDetails4"
                                className="img-md img-thumbnail"
                                alt=""
                              />
                            </a>
                            <div className="info">
                              <a href="#" className="nav-link mb-1">
                                {data.productName}
                              </a>
                              <strong className="text-dark">
                                {" "}
                                &#8377;{data.productDiscount}
                              </strong>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

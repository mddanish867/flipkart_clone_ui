import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BiSolidBolt,BiSolidPurchaseTag } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import "./ProductDetails.css";
import MultiItemCarousel from "./MultiItemCarousel";
import Swal from 'sweetalert2';

export default function ProductDetails() {
  let params = useParams();
  let navigate = useNavigate();
  const [getProductId, setProductId] = useState([]);
  let [ProductImage, setProductimage] = useState([]);
  const [userName, setUserName] = useState(""); 
  let [stockCount, setstockCount] = useState(0);
  const [recommendation, setRecommendation] = useState([]);
  let sub = "";
  const [existingProductId, setExistingProductId] =useState(0);
  const [orderAddress, setorderAddress] = useState("");
  let [displayNewAddress, setDisplayNewAddress] = useState("");


  useEffect(() => {   
    setUserName(localStorage.getItem("email"));
    getproductData();
    getproductimage();
    checkExistingProduct();
    getDeliveryAddress();
  }, []);

  const getDeliveryAddress = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Account/RetrieveDeliveryAddress/user_name/${localStorage.getItem("email")}/delivery_address`
    );
    setDisplayNewAddress(response.data.result[0]);
    setorderAddress(
      response.data.result[0].address +
        response.data.result[0].city +
        response.data.result[0].state +
        response.data.result[0].zip
    );
  };

  // method to get all product images based on Id
  const getproductimage = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductDetails/id/${params.productId}/products`
    );
    setProductimage(response.data.result);
  };

  // method to get product based on id
  const getproductData = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductList/products?ProductId=${params.productId}`
    );
    setProductId(response.data.result);
    setstockCount(response.data.result[0].productQuanitity);
    sub = response.data.result[0].subCategory;
    recommendedPrudtcs();
  };

  // method to get recommended product based on selection
  const recommendedPrudtcs = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductList/products?SubCategory=${sub}`
    );
    setRecommendation(response.data.result);
  };

  // method to check if the products is already exists into cart or not
  const checkExistingProduct = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Cart/RetrieveCartDetails/cart?ProductId=${params.productId}`
    );   
    setExistingProductId(response.data.result[0].productId);
  };

  // method to decrease the products count

  // const handleDecrement = () => {
  //   count > 1 ? setCount(count - 1) : setCount(1);
  // };

  // method to increse the products count
  // const handleIncrement = () => {
  //   count < stockCount ? setCount(count + 1) : setCount(stockCount);
  // };

  // Method to add the products ino cart
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: (result.data.message),
            showConfirmButton: false,
            timer: 1500
          })
          if (result.data.message === "OK") {
            window.location.reload();
            navigate("/cart");
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: {error}
          })
        });
    }
  };

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

  return (
    <>
      <div>
        

        <div className="row">
          <div className="col-2" style={{marginTop:"0",backgroundColor:"#fff"}}>
            <div className="container">
              {ProductImage.map((data) => {
                return (
                  <div className="row imgRowDetails">
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
                            alt=""
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
              <div className="col-10" style={{backgroundColor:"#fff"}}>
                <section className="py-5">
                  <div className="container">
                    <div className="row">
                      <aside className="col-lg-4 my-1" style={{marginLeft:"-96px",width:"440px",height:"550px",marginTop:"-54px"}}>
                        <div
                          className="border mb-3 d-flex justify-content-center"
                          style={{ borderRadius: "0 0 0 0",marginTop:"-43px",height:"400px",width:"408px" }}
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
                              style={{height:"400px"}}
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
                            marginTop:"-54px"
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
                      <main className="col-lg-8" style={{marginLeft:"-26px"}}>
                        <div className="ps-lg-3">
                          <h6 className="title text-dark">
                            {data.productName}
                          </h6>
                          <div className="d-flex flex-row my-3">
                            <div className="text-warning mb-1 me-2">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fas fa-star-half-alt"></i>
                              <span className="ms-1">rating {data.rating}</span>
                            </div>
                            <span className="text-muted">
                              <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                              {data.productQuanitity}
                            </span>
                            <span className="text-success ms-2">In stock</span>
                          </div>

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
                        
                          <div className="row">
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
                                    border:"2px solid"
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
                                    border:"2px solid"
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
                                    border:"2px solid"
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
                                    border:"2px solid"
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
                                    border:"2px solid"
                                  }}
                                >
                                  XXL
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="filter-content collapse show"
                              id="collapse_4"
                              style={{ display: "flex" }}
                            >
                              Color
                              {ProductImage.map((data) => {
                                return (
                                  <div>
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
                                        width: "50px",
                                        display: "inline-table",
                                        border:"2px solid blue"
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
                            style={{ height: "55x", padding: "5px" }}
                          >
                            {orderAddress}{" "}
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
                          
                          <h4 className="my-4">Product Details</h4>
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

                          <hr />
                          <h4>Ratings & Reviews</h4>

                          <hr />
                          <h4>Question & Answers</h4>
                        </div>
                      </main>

                      
                    </div>
                  </div>
                </section>
              </div>
            );
          })}
          
            
        </div>
        <div >
          {/* <h4 className="mx-4">Frequently bought together</h4> */}
          <MultiItemCarousel/>
        </div>
        <div >
          {/* <h4 className="mx-4">You might be interested in</h4> */}
          <MultiItemCarousel/>
        </div>
        <div >
          {/* <h4 className="mx-4"> Bought together</h4> */}
          <MultiItemCarousel/>
        </div>
        <div>
          {/* <h4 className="mx-4">Recently viewed</h4> */}
          <MultiItemCarousel/>
        </div>

        <section className="bg-light border-top py-4">
          <div className="container">
            <div className="row gx-4">
              <div className="col-lg-8 mb-4">
                <div className="border rounded-2 px-3 py-2 bg-white">
                  {/* <!-- Pills navs --> */}
                  <ul
                    className="nav nav-pills nav-justified mb-3"
                    id="ex1"
                    role="tablist"
                  >
                    <li className="nav-item d-flex" role="presentation">
                      <Link
                        className="nav-link d-flex align-items-center justify-content-center w-100 active"
                        id="ex1-tab-1"
                        data-mdb-toggle="pill"
                        to=""
                        role="tab"
                        aria-controls="ex1-pills-1"
                        aria-selected="true"
                      >
                        Item Details
                      </Link>
                    </li>
                    <li className="nav-item d-flex" role="presentation">
                      <Link
                        className="nav-link d-flex align-items-center justify-content-center w-100"
                        id="ex1-tab-2"
                        data-mdb-toggle="pill"
                        to=""
                        role="tab"
                        aria-controls="ex1-pills-2"
                        aria-selected="false"
                      >
                        Rating & Reviews
                      </Link>
                    </li>
                    <li className="nav-item d-flex" role="presentation">
                      <Link
                        className="nav-link d-flex align-items-center justify-content-center w-100"
                        id="ex1-tab-3"
                        data-mdb-toggle="pill"
                        to=""
                        role="tab"
                        aria-controls="ex1-pills-3"
                        aria-selected="false"
                      >
                        Questions & Answers
                      </Link>
                    </li>
                    <li className="nav-item d-flex" role="presentation">
                      <Link
                        className="nav-link d-flex align-items-center justify-content-center w-100"
                        id="ex1-tab-4"
                        data-mdb-toggle="pill"
                        to=""
                        role="tab"
                        aria-controls="ex1-pills-4"
                        aria-selected="false"
                      >
                        Seller profile
                      </Link>
                    </li>
                  </ul>
                  {/* <!-- Pills navs --> */}

                  {/* <!-- Pills content --> */}
                  <div className="tab-content" id="ex1-content">
                    <div
                      className="tab-pane fade show active"
                      id="ex1-pills-1"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-1"
                    >
                      <p>
                        With supporting text below as a natural lead-in to
                        additional content. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur.
                      </p>
                      <div className="row mb-2">
                        <div className="col-12 col-md-6">
                          <ul className="list-unstyled mb-0">
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Some great feature name here
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Lorem ipsum dolor sit amet, consectetur
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Duis aute irure dolor in reprehenderit
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Optical heart sensor
                            </li>
                          </ul>
                        </div>
                        <div className="col-12 col-md-6 mb-0">
                          <ul className="list-unstyled">
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Easy fast and ver good
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Some great feature name here
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Modern style and design
                            </li>
                          </ul>
                        </div>
                      </div>
                      <table className="table border mt-3 mb-2">
                        <tr>
                          <th className="py-2">Display:</th>
                          <td className="py-2">
                            13.3-inch LED-backlit display with IPS
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2">Processor capacity:</th>
                          <td className="py-2">
                            2.3GHz dual-core Intel Core i5
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2">Camera quality:</th>
                          <td className="py-2">720p FaceTime HD camera</td>
                        </tr>
                        <tr>
                          <th className="py-2">Memory</th>
                          <td className="py-2">8 GB RAM or 16 GB RAM</td>
                        </tr>
                        <tr>
                          <th className="py-2">Graphics</th>
                          <td className="py-2">Intel Iris Plus Graphics 640</td>
                        </tr>
                      </table>
                    </div>
                    <div
                      className="tab-pane fade mb-2"
                      id="ex1-pills-2"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-2"
                    >
                      Tab content or sample information now <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum. Lorem ipsum
                      dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo
                    </div>
                    <div
                      className="tab-pane fade mb-2"
                      id="ex1-pills-3"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-3"
                    >
                      Another tab content or sample information now <br />
                      Dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </div>
                    <div
                      className="tab-pane fade mb-2"
                      id="ex1-pills-4"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-4"
                    >
                      Some other tab content or sample information now <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </div>
                  </div>
                  {/* <!-- Pills content --> */}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="px-0 border rounded-2 shadow-0">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Similar products</h5>

                      {recommendation.map((data) => {
                        return (
                          <div className="d-flex mb-3">
                            <a href="/" className="me-3">
                              <img
                                src={data.productImageurl}
                                id="productDetails4"
                                className="img-md img-thumbnail"
                                alt=""
                              />
                            </a>
                            <div className="info">
                              <a href="/" className="nav-link mb-1">
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

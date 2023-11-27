import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Cart.css";
import { MdDelete } from "react-icons/md";



export default function WishList() {
  const [getProductId, setProductId] = useState([]);
  const [count, setCount] = useState(1);
  const [state, setState] = useState(false);
  let [afterDiscount, setAfterDiscount] = useState(0);
  let [actualPrice, setActualPrice] = useState(0);
  let [itemCount, setItemCopunt] = useState(0);
  let username = localStorage.getItem("email");

  let navigate = useNavigate();
  let setSubTotal = 0;
  let priceofProduct = 0;
  let productId = 0;
  let params = useParams();
  const getproductData = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductList/favourites?UserName=${username}`
    );
    for (let i = 0; i < response.data.result.length; i++) {
      priceofProduct = priceofProduct + response.data.result[i].productPrice;
      setSubTotal = setSubTotal + response.data.result[i].productDiscount;
      setActualPrice(priceofProduct);
      setAfterDiscount(setSubTotal);
      setItemCopunt(response.data.result.length);
    }
    setProductId(response.data.result);
  };

  useEffect(() => {
    getproductData();
  }, []);

  const handleChange = () => {
    if (count > 1) {
      setState(false);
    }
  };

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

  const handlePlaceOrder = () => {
    if (username === "" || username === null || username === undefined) {
      navigate("/signin");
    } else {
      navigate("/order");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <div className="card my-3" style={{ borderRadius: "0 0 0 0" }}>
              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "white" }}
                >
                  <span>Hello,</span>
                  <h5 className="title">Md Danish Akhtar</h5>
                </header>
              </article>

              <article className="filter-group my-2">
                <header
                  className="card-header"
                  style={{ backgroundColor: "white" }}
                >
                  <h6 className="title">MY ORDERS </h6>
                </header>
              </article>

              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "white" }}
                >
                  <h6 className="title">ACCOUNT SETTINGS </h6>
                </header>
                <div className="filter-content collapse show" id="collapse_2">
                  <div className="card-body">
                    <div>Profile Information</div>

                    <div>Manage Adresses</div>

                    <div>PAN Information</div>
                  </div>
                </div>
              </article>

              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "white" }}
                >
                  <h6 className="title">PAYMENTS </h6>
                </header>
                <div className="filter-content collapse show" id="collapse_2">
                  <div className="card-body">
                    <div>Gift Cards</div>

                    <div>Saved UPI</div>

                    <div>Saved Card</div>
                  </div>
                </div>
              </article>

              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "white" }}
                >
                  <h6 className="title">MY STUFF </h6>
                </header>
                <div className="filter-content collapse show" id="collapse_2">
                  <div className="card-body">
                    <div>My Coupons</div>

                    <div>My Reviews & Ratings</div>

                    <div>All Notifications</div>

                    <div>My Wishlist</div>
                  </div>
                </div>
              </article>

              <hr />

              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "white" }}
                >
                  <h6 className="title">Logout </h6>
                </header>
              </article>
            </div>
          </aside>

          <main className="col-md-9 my-3">
            <section className="bg-light border-top">
              {getProductId ?
              <div className="container">
                <div className="row gx-4" style={{ backgroundColor: "white" }}>
                  <div className="col-lg-12 mb-4">
                    <div>
                    <div className="my-4">
                                      <h5>My Wishlist (1)</h5>
                                      </div>
                      {getProductId.map((data) => {
                        return (                          
                          <div className="col-12 pull-left">
                            <div className="row justify-content-center mb-3">
                              <div className="card shadow-4 mx-1" style={{borderBottom:"none",borderLeft:"none",borderRight:"none"}}>
                                <div className="card-body" key={data.productId}>
                                  <div className="row">
                                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0" style={{width:"140px"}}>
                                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                        <img
                                          src={data.productImageurl}
                                          className="w-100"
                                          alt="No image found"
                                          style={{height:"100px"}}
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
                                      <p style={{fontWeight:500}}>{data.productName}</p>                                     
                                      <div className="d-flex flex-row align-items-center mb-1">
                                        <h4 className="mb-1 me-1">
                                          &#8377;{data.productDiscount}
                                        </h4>
                                        <span className="text-muted">
                                          <s>&#8377;{data.productPrice}</s>
                                        </span>
                                        <span className="text-success mx-2">
                                          &#8377;{Math.round(100-(data.productDiscount)/(data.productPrice)*100)} % off
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-3">
                                      <div className="d-flex flex-column mt-4 my-5">
                                        <button
                                          type="button"
                                          style={{border:"none",backgroundColor:"#fff"}}
                                          onClick={(e) =>
                                            handleRemoveFromCart()
                                          }
                                        >
                                          <MdDelete style={{color:"rgb(186 188 191)",height:"25px",marginLeft:"176px"}}/>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              :
              <div>
<div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0" style={{width:"140px"}}>
              <div className="bg-image hover-zoom ripple rounded ripple-surface">
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png"
                  className="w-100"
                  alt="No image found"
                  style={{height:"100px"}}
                />                
              </div>
            </div> 
              </div>
              
              }
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsHeart } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { LiaStarSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import "../../components/RatingAndReviews/RatingAndReviews.css";

export default function RatingAndReviews() {
  let userEmail = localStorage.getItem("email");
  const [getOrders, setOrders] = useState([]);
  const [productImageUrl, setproductImageUrl] = useState("");
  const [ReviewDesc, setReviewDesc]= useState("");
  const [ReviewTitle, setReviewTitle] = useState("");
  const [ReviewCustName, setReviewCustName] = useState("");
  let params = useParams();
  let [startrating , setstartrating] = useState(0);
  let productId= 0;
  useEffect(() => {
    getOrderData();
  }, []);

  // Retrieve Order details based on  username
  const getOrderData = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Order/RetrieveOrderDetails/orders?OrderTrackId=${params.orderTrackId}`
    );
    for (let i = 0; i < response.data.result.length; i++) {
      setproductImageUrl(response.data.result[i].productImageUrl);
    }
    setOrders(response.data.result);
  };

  const handleOneStar = (e) =>{  
    let isChecked = e.target.checked;    
    if(isChecked === true){
      setstartrating(1);
    }
  }
  const handleTwoStar = (e) =>{  
    let isChecked = e.target.checked;    
    if(isChecked === true){
      setstartrating(2);
    }
  }
  const handleThreeStar = (e) =>{  
    let isChecked = e.target.checked;    
    if(isChecked === true){
      setstartrating(3);
    }
  }
  const handleFourStar = (e) =>{  
    let isChecked = e.target.checked;    
    if(isChecked === true){
      setstartrating(4);
    }
  }
  const handleFiveStar = (e) =>{  
    let isChecked = e.target.checked;    
    if(isChecked === true){
      setstartrating(5);
    }
  }

  const  handleReviesDescChange = (value) =>{
    setReviewDesc(value);
   }
   const  handleReviewsTitleChange = (value) =>{
    setReviewTitle(value);
   }
   const  handleReviewsCustNmaeChange = (value) =>{
    setReviewCustName(value);
   }
   
    const handleReviewSubmit = async (e) => {
      e.preventDefault();
      const data = { 
        ProductId: productId, 
        Review: ReviewDesc, 
        Rating:startrating,
        Title:ReviewTitle,
        CustomerName:ReviewCustName,
        UserName:userEmail,
        Image:""
      };
      const url = "https://localhost:7274/api/Account/RatingReviews/rating_reviews";
      axios
        .post(url, data)
        .then((response) => {
         Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'Thank you so much for your feedback!.',
           showConfirmButton: false,
           timer: 1500
         })
        })
        .catch((error) => {
         Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'Something went wrong!',
           footer: (error)
         })
        });
   }
   
  return (
    <>
      <section style={{ display: "flex", backgroundColor: "#f1f3f6" }}>
        <div className="col-12" style={{ marginTop: "-7px" }}>
          <div
            className="row gx-4 my-3"
            style={{
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
              backgroundColor: "#fff",
              marginBottom: "10px",
            }}
          >
            <div className="col-lg-12 mb-4" style={{ height: "55px" }}>
              <div className=" px-3 py-2 ">
                <div className="py-1 col-12 mx-1 pull-left">
                  <div className="row justify-content-center mb-3">
                    <div
                      className="card mx-1"
                      style={{ border: "none", height: "18px" }}
                    >
                      <div className="card-body">
                        <div>
                          <h5 style={{ fontWeight: "500", fontSize: "22px" }}>
                            Ratings & Reviews
                          </h5>
                        </div>
                        {getOrders.map((data) => {
                          productId = data.productId;
                          return (
                            <Link
                              style={{ textDecoration: "none" }}
                              to={
                                userEmail !== null
                                  ? `/productdetails/${data.productId}`
                                  : `/signin`
                              }
                            >
                              <div
                                className="row"
                                style={{ marginLeft: "855px" }}
                              >
                                <div className="col-md-6 col-lg-6 col-xl-6">
                                  <div
                                    className="d-flex flex-row"
                                    style={{ width: "190px" }}
                                  >
                                    <span
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        marginLeft: "-31px",
                                        marginTop: "-43px",
                                      }}
                                    >
                                      {data.productName.slice(0, 25)}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0"
                                  style={{
                                    width: "110px",
                                    marginTop: "-44px",
                                  }}
                                >
                                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                    <img
                                      src={data.productImageurl}
                                      className="w-100"
                                      alt=""
                                      style={{ height: "50px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", marginTop: "-8px" }}>
            <div
              className="col-3"
              style={{
                boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
                backgroundColor: "#fff",
                marginBottom: "10px",
                marginRight: "11px",
              }}
            >
              <span style={{ fontWeight: "500", fontSize: "18px" }}>
                What makes a good review
              </span>
              <hr />
              <p style={{ fontSize: "18px"}}>Have you used this product?</p>
              <span style={{ fontSize: "14px" }}>
                Your review should be about your experience with the product.
              </span>
              <hr />
              <p style={{ fontSize: "18px" }}>Why review a product?</p>
              <span style={{ fontSize: "14px" }}>
                Your valuable feedback will help fellow shoppers decide!
              </span>
              <hr />
              <p style={{ fontSize: "18px" }}>How to review a product?</p>
              <spna style={{ fontSize: "14px" }}>
                Your review should include facts. An honest <br />
                opinion is always appreciated. If you have an <br />
                issue with the product or service please contact <br />
                us from the help centre.
              </spna>
            </div>

            <div
              className="col-9"
              style={{
                boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
                backgroundColor: "#fff",
                marginBottom: "10px",
              }}
            >
              <div style={{ height: "80px" }}>
                <h6
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginTop: "25px",
                  }}
                >
                  Rate this product
                </h6>
                <div className="rating">
                  <input type="radio" id="star5" name="rating" value="5" onChange={e => handleFiveStar(e)}/>
                  <label htmlFor="star5"></label>
                  <input type="radio" id="star4" name="rating" value="4" onChange={e => handleFourStar(e)}/>
                  <label htmlFor="star4"></label>
                  <input type="radio" id="star3" name="rating" value="3" onChange={e => handleThreeStar(e)}/>
                  <label htmlFor="star3"></label>
                  <input type="radio" id="star2" name="rating" value="2" onChange={e => handleTwoStar(e)} />
                  <label htmlFor="star2"></label>
                  <input type="radio" id="star1" name="rating" value="1"  onChange={e => handleOneStar(e)}/>
                  <label htmlFor="star1"></label>
                </div>
              </div>
              <hr style={{ width: "100%" }}></hr>
              <div className="my-2">
                <h6
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginTop: "25px",
                  }}
                >
                  Review this product
                </h6>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Description.."
                    style={{
                      height: "180px",
                      marginTop: "25px",
                      borderRadius: "0 0 0 0",
                    }}
                    onChange={(e) => handleReviesDescChange(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Review Title (optional)"
                    style={{ height: "65px", borderRadius: "0 0 0 0" }}
                    onChange={(e) => handleReviewsTitleChange(e.target.value)}

                  ></textarea>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Flipkart customer (Name)"
                    style={{ height: "65px", borderRadius: "0 0 0 0" }}
                    onChange={(e) => handleReviewsCustNmaeChange(e.target.value)}

                  ></textarea>
                </div>
                <div
                  className="input--file"
                  style={{ position: "relative", color: "#7f7f7f" }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="3.2" />
                      <path d="M9 2l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                      <path d="M0 0h24v24h-24z" fill="none" />
                    </svg>
                  </span>
                  <input
                    name="Select File"
                    type="file"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      opacity: 0,
                    }}
                  />
                  <br />
                  <Link
                    className="btn btn-primary shadow-0 align-self-start mr-auto"
                    style={{
                      width: "220px",
                      height: "60px",
                      textAlign: "center",
                      padding: "15px",
                      marginLeft: "675px",
                      backgroundColor: "#fb641b",
                      borderColor: "#fb641b",
                      borderRadius: "0 0 0 0",
                      border: "2px solid #fb641b",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "16px",
                      bottom: "10px",
                    }}
                    onClick={handleReviewSubmit}
                  >
                    SUBMIT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

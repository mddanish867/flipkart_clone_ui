import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import "../../components/RatingAndReviews/ProductReview.css";

export default function ProductReview() {
  const [ratingDetails, setRatingDetails] = useState([]);
  const [getProductbasedonId, setProductbasedonId] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [singleStarCount, setSingleStarCount] = useState(0);
  const [doubleStarCount, setDoubleStarCount] = useState(0);
  const [tripleStarCount, setTripleStarCount] = useState(0);
  const [fourthStarCount, setFourthStarCount] = useState(0);
  const [fifthStarCount, setFifthStarCount] = useState(0);
  const [fifthStarPerc, setFifthStarPerc] = useState(0);
  const [fourthStarPerc, setFourthStarPerc] = useState(0);
  const [thridStarPerc, setThridStarPerc] = useState(0);
  const [twoStarPerc, setTwoStarPerc] = useState(0);
  const [oneStarPerc, setOneStarPerc] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(0)

  let params = useParams();
  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let fourStar = 0;
  let fiveStar = 0;
  let sumOfAllRating = 0;
  let totalRatingCount = 0;
  let totalReviewCount = 0;
  let averageratingCount = 0;
  let value = "";

  useEffect(() => {
    getRatingReviewDetails();
    getproductData();
    getRatingReviews();
  }, [page]);
  // method to get all product rating ang and review details
  const getRatingReviewDetails = async () => {
    const response = await axios.get(
      // `https://localhost:7274/api/Products/ProductRatingDetails/rating-reviews-details`
      `https://localhost:7274/api/Products/ProductRatingDetails/product-id/${params.productId}/rating-reviews-details`
    );
    setRatingDetails(response.data.result);
  };

  // method to get product based on id
  const getproductData = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductList/products?ProductId=${params.productId}`
    );
    setProductbasedonId(response.data.result);
  };

  // method to get all product rating and reviews for perticular product
  const getRatingReviews = async () => {
    let fiiveStartPercentaget = 0;
    let fourStartPercentaget = 0;
    let threeStartPercentaget = 0;
    let twoStartPercentaget = 0;
    let oneStartPercentaget = 0;

    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductRatings/product-id/${params.productId}/rating-reviews`
    );

    for (let i = 0; i < response.data.result.length; i++) {
      if (response.data.result[i].rating === 1) {
        oneStar += 1;
      } else if (response.data.result[i].rating === 2) {
        twoStar += 1;
      } else if (response.data.result[i].rating === 3) {
        threeStar += 1;
      } else if (response.data.result[i].rating === 4) {
        fourStar += 1;
      }
      if (response.data.result[i].rating === 5) {
        fiveStar += 1;
      }
      sumOfAllRating = sumOfAllRating + response.data.result[i].rating;
      totalRatingCount = response.data.result.length;
      totalReviewCount = response.data.result.length;
      averageratingCount = (
        sumOfAllRating / response.data.result.length
      ).toFixed(1);
    }
    //setRatings(response.data.result);
    setTotalRatings(totalRatingCount);
    setTotalReviews(totalReviewCount);
    setAverageRating(averageratingCount);
    setSingleStarCount(oneStar);
    setDoubleStarCount(twoStar);
    setTripleStarCount(threeStar);
    setFourthStarCount(fourStar);
    setFifthStarCount(fiveStar);
    fiiveStartPercentaget = (
      (fiveStar / response.data.result.length) *
      100
    ).toFixed();
    fourStartPercentaget = (
      (fourStar / response.data.result.length) *
      100
    ).toFixed();
    threeStartPercentaget = (
      (threeStar / response.data.result.length) *
      100
    ).toFixed();
    twoStartPercentaget = (
      (twoStar / response.data.result.length) *
      100
    ).toFixed();
    oneStartPercentaget = (
      (oneStar / response.data.result.length) *
      100
    ).toFixed();
    setFifthStarPerc(fiiveStartPercentaget);
    setFourthStarPerc(fourStartPercentaget);
    setThridStarPerc(threeStartPercentaget);
    setTwoStarPerc(twoStartPercentaget);
    setOneStarPerc(oneStartPercentaget);
  };

  const onHandleClick = () => {
    if (isActive === true) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const onHandleChange = async () =>{    
    value = document.getElementById("ratingFilter").value;
    if(value === "Recent"){
      filterRatingByMostRecent();     
    }
    if(value === "Negative"){
      filterRatingByNegative(); 
    }
    if(value === "Positive"){
      filterRatingByPositive();
    }
    if(value === "Helpfull"){
      filterRatingByMostHelpfull();
    }
  }

  const filterRatingByMostRecent =  async () =>{
    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductRatingFilter/product-id/${params.productId}/rating-reviews-details?Recent=${value}`
    );
    setRatingDetails(response.data.result); 
  }

 const filterRatingByNegative = async () =>{
  const response = await axios.get(
    `https://localhost:7274/api/Products/ProductRatingFilter/product-id/${params.productId}/rating-reviews-details?Rating=${value}`
    );
    setRatingDetails(response.data.result);
 }
 const filterRatingByPositive = async () =>{
  const response = await axios.get(
    `https://localhost:7274/api/Products/ProductRatingFilter/product-id/${params.productId}/rating-reviews-details?Rating=${value}`
    );
    setRatingDetails(response.data.result);
 }

  const filterRatingByMostHelpfull = async () =>{    
    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductRatingFilter/product-id/${params.productId}/rating-reviews-details`
      );
      setRatingDetails(response.data.result);    
  }

  const selectPagehandler = (selectedPage) =>{
    if(selectedPage >= 1 && selectedPage <= ratingDetails.length/2 && selectedPage !== page)
    setPage(selectedPage)
  }
  return (
    <div style={{ display: "flex" }}>
      <div
        className="col-3"
        style={{
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
          backgroundColor: "#fff",
          marginBottom: "10px",
          marginRight: "2px",
        }}
      >
        {getProductbasedonId.map((data) => {
          return (
            <>
              <div
                className="mb-3 d-flex justify-content-center"
                style={{
                  borderRadius: "0 0 0 0",
                  marginTop: "29px",
                  height: "300px",
                  width: "260px",
                }}
              >
                <Link
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="/"
                  data-type="image"
                  to={`/productdetails/${params.productId}`}
                >
                  <img
                    className="rounded-4 fit"
                    id="productdetails1"
                    src={data.productImageurl}
                    alt=""
                    style={{ height: "280px" }}
                  />
                </Link>
              </div>
              <span className="text-muted my-2" style={{ fontWeight: 500 }}>
                {data.brands}
              </span>
              <Link className="ratingProductname" to={`/productdetails/${params.productId}`}>
                {data.productName.slice(0, 30)}...
              </Link>
              <div className="mb-3" style={{ marginTop: "-4px" }}>
                <span
                  className="h6"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  &#8377;{data.productDiscount}.00
                </span>
                <del className="text-muted mx-2" style={{ fontSize: "14px" }}>
                  &#8377;{data.productPrice}.00
                </del>
                <span className="text-success mx-2 h6">
                  {((data.productDiscount / data.productPrice) * 100).toFixed(
                    2
                  )}
                  % off
                </span>
              </div>
              <hr
                style={{
                  border: "1px solid gray",
                  marginLeft: "-14px",
                  width: "315px",
                }}
              />
            </>
          );
        })}
      </div>

      <div
        className="col-9"
        style={{
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
          backgroundColor: "#fff",
          marginBottom: "10px",
        }}
      >
        <div>
          <p
            style={{
              marginTop: "25px",
              fontSize: "24px",
              fontWeight: 600,
              marginLeft: "14px",
            }}
          >
            WROGN Solid Men Round Neck Black T-Shirt Reviews
          </p>
          <div style={{ marginLeft: "770px", marginTop: "-40px" }}>
            <form>
              <select id="ratingFilter" onChange={onHandleChange}>
                <option value="Helpfull"> Most Helpfull</option>
                <option value="Recent"> Most Recent</option>
                <option value="Positive"> Positive First</option>
                <option value="Negative"> Negative First</option>
              </select>
            </form>
          </div>
          <hr
            style={{
              border: "1px solid rgb(170, 166, 166)",
              marginLeft: "-15px",
              marginTop: "32px",
            }}
          ></hr>
        </div>
        <div className="col-2" style={{ marginLeft: "35px" }}>
          <span
            className="badge rounded-pill mx-4"
            style={{
              width: "65px",
              height: "28px",
              backgroundColor: "#26a541",
              fontSize: "18px",
              marginTop: "50px",
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
        </div>

        <div className="col-2" style={{ marginLeft: "40px" }}>
          <span className="text-muted mx-1">
            {totalRatings} ratings <br />
            and {totalReviews} reviews
          </span>
        </div>
        <div
          className="col-4"
          style={{ marginLeft: "200px", marginTop: "-76px" }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ fontSize: "small", fontWeight: 500 }}>
              5 <AiFillStar style={{ height: "11pxpx", marginTop: "-4px" }} />
            </span>
            <div
              className="progress"
              style={{
                width: "200px",
                marginLeft: "10px",
                marginTop: "7px",
                height: "5px",
              }}
            >
              <div
                className="progress-barbg-success"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${fifthStarPerc}%`,
                  marginLeft: "-12px",
                  height: "5px",
                }}
              ></div>
            </div>
            <span
              className="text-muted"
              style={{ marginLeft: "10px", fontSize: "small", fontWeight: 500 }}
            >
              {fifthStarCount}
            </span>
          </div>

          <div style={{ display: "flex" }}>
            <span style={{ fontSize: "small", fontWeight: 500 }}>
              4 <AiFillStar style={{ height: "11pxpx", marginTop: "-4px" }} />
            </span>
            <div
              className="progress"
              style={{
                width: "200px",
                marginLeft: "10px",
                marginTop: "7px",
                height: "5px",
              }}
            >
              <div
                className="progress-barbg-success"
                role="progressbar"
                s
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${fourthStarPerc}%`,
                  marginLeft: "-12px",
                  height: "5px",
                }}
              ></div>
            </div>
            <span
              className="text-muted"
              style={{ marginLeft: "10px", fontSize: "small", fontWeight: 500 }}
            >
              {fourthStarCount}
            </span>
          </div>

          <div style={{ display: "flex" }}>
            <span style={{ fontSize: "small", fontWeight: 500 }}>
              3 <AiFillStar style={{ height: "11pxpx", marginTop: "-4px" }} />
            </span>
            <div
              className="progress"
              style={{
                width: "200px",
                marginLeft: "10px",
                marginTop: "7px",
                height: "5px",
              }}
            >
              <div
                className="progress-barbg-success"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${thridStarPerc}%`,
                  marginLeft: "-12px",
                  height: "5px",
                }}
              ></div>
            </div>
            <span
              className="text-muted"
              style={{ marginLeft: "10px", fontSize: "small", fontWeight: 500 }}
            >
              {tripleStarCount}
            </span>
          </div>

          <div style={{ display: "flex" }}>
            <span style={{ fontSize: "small", fontWeight: 500 }}>
              2 <AiFillStar style={{ height: "11pxpx", marginTop: "-4px" }} />
            </span>
            <div
              className="progress"
              style={{
                width: "200px",
                marginLeft: "10px",
                marginTop: "7px",
                height: "5px",
              }}
            >
              <div
                className="progress-barbg-danger"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${twoStarPerc}%`,
                  marginLeft: "-12px",
                  height: "5px",
                }}
              ></div>
            </div>
            <span
              className="text-muted"
              style={{ marginLeft: "10px", fontSize: "small", fontWeight: 500 }}
            >
              {doubleStarCount}
            </span>
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ fontSize: "small", fontWeight: 500 }}>
              1{" "}
              <AiFillStar
                style={{
                  height: "11pxpx",
                  marginTop: "-4px",
                  marginLeft: "3px",
                }}
              />
            </span>
            <div
              className="progress"
              style={{
                width: "200px",
                marginLeft: "9px",
                marginTop: "7px",
                height: "5px",
              }}
            >
              <div
                className="progress-barbg-danger2"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${oneStarPerc}%`,
                  marginLeft: "-12px",
                  height: "5px",
                }}
              ></div>
            </div>
            <span
              className="text-muted"
              style={{ marginLeft: "10px", fontSize: "small", fontWeight: 500 }}
            >
              {singleStarCount}
            </span>
          </div>
        </div>
        <div
          className="col-4"
          style={{ marginLeft: "497px", marginTop: "-97px" }}
        >
          <p
            style={{ marginLeft: "13px", marginTop: "-17px", fontWeight: 500 }}
          >
            Read reviews that mention:
          </p>
          <button
            className="mx-2 my-1"
            style={{
              border: "none",
              backgroundColor: `${isActive === true ? "#0d6efd" : "#fff"}`,
              boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
              outline: "none",
              fontSize: "14px",
              height: "34px",
              color: `${isActive === true ? "#fff" : "black"}`,
            }}
            onClick={onHandleClick}
          >
            Overall
          </button>

          <button
            className="mx-2 my-1"
            style={{
              border: "none",
              backgroundColor: `${isActive === true ? "#0d6efd" : "#fff"}`,
              boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
              outline: "none",
              fontSize: "14px",
              height: "34px",
              color: `${isActive === true ? "#fff" : "black"}`,
            }}
            //onClick={onHandleClick}
          >
            Fabrick Quality
          </button>
          <button
            className="mx-2 my-1"
            style={{
              border: "none",
              backgroundColor: `${isActive === true ? "#0d6efd" : "#fff"}`,
              boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
              outline: "none",
              fontSize: "14px",
              height: "34px",
              color: `${isActive === true ? "#fff" : "black"}`,
            }}
            //onClick={onHandleClick}
          >
            Colour
          </button>
          <button
            className="mx-2 my-1"
            style={{
              border: "none",
              backgroundColor: `${isActive === true ? "#0d6efd" : "#fff"}`,
              boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
              outline: "none",
              fontSize: "14px",
              height: "34px",
              color: `${isActive === true ? "#fff" : "black"}`,
            }}
            //onClick={onHandleClick}
          >
            Style
          </button>
          <button
            className="mx-2 my-1"
            style={{
              border: "none",
              backgroundColor: `${isActive === true ? "#0d6efd" : "#fff"}`,
              boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
              outline: "none",
              fontSize: "14px",
              height: "34px",
              color: `${isActive === true ? "#fff" : "black"}`,
            }}
            //onClick={onHandleClick}
          >
            Comfort
          </button>
          <button
            className="mx-2 my-1"
            style={{
              border: "none",
              backgroundColor: `${isActive === true ? "#0d6efd" : "#fff"}`,
              boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
              outline: "none",
              fontSize: "14px",
              height: "34px",
              color: `${isActive === true ? "#fff" : "black"}`,
            }}
            //onClick={onHandleClick}
          >
            True to Specs
          </button>
          <button
            className="mx-2 my-1"
            style={{
              border: "none",
              backgroundColor: `${isActive === true ? "#0d6efd" : "#fff"}`,
              boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
              outline: "none",
              fontSize: "14px",
              height: "34px",
              color: `${isActive === true ? "#fff" : "black"}`,
            }}
            //onClick={onHandleClick}
          >
            Stitching Quality
          </button>
        </div>
        {ratingDetails.slice(0, page * 2).map((data) => {
          let rating = data.rating;
          return (
            <div style={{ marginTop: "50px" }}>
              <div
                style={{
                  display: "flex",
                  marginLeft: "-17px",
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
                ) : rating === 2 ? (
                  <span
                    className="badge rounded-pill mx-4"
                    style={{
                      width: "37px",
                      height: "19px",
                      marginTop: "7px",
                      paddingTop: "4px",
                      backgroundColor: "#ff9f00",
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
                <p className="mx-2 text-muted">{data.reviewedAt}</p>
              </div>
              <div style={{ display: "flex", marginLeft: "7px" }}>
                <IoIosCheckmarkCircle style={{ color: "gray" }} />
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
        {ratingDetails.length > 0 && (
          <div style={{ marginLeft: "150px" }}>
            <div className="pagination">
              <span
                onClick={() => selectPagehandler(page - 1)}
                className={page > 1 ? "beforpagination" : "pagination-disable"}
              >
                Previuos
              </span>
              {[...Array(Math.round(ratingDetails.length / 2))].map((_, i) => {
                return (
                  <span
                    className={page === i + 1 ? "paginationClass" : ""}
                    onClick={() => selectPagehandler(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </span>
                );
              })}
              <span
                onClick={() => selectPagehandler(page + 1)}
                className={
                  page < ratingDetails.length / 2 ? "beforpagination" : "pagination-disable"
                }
              >
                Next
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

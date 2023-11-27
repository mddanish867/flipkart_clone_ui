import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "../../components/RatingAndReviews/ProductQestions.css";
import PostQuestions from "../Popups/PostQuestions";


export default function ProductQuestions() {
  const [getProductbasedonId, setProductbasedonId] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [showModel, setShowwModel] = useState(false);
  const [getProductQuestionair, setProductQuestionair] = useState([]);
  const [searchAnswers, setsearchAnswers]= useState("");

  let params = useParams();
  let sumOfAllRating = 0;
  let totalRatingCount = 0;
  let averageratingCount = 0;
  useEffect(() => {
    getproductData();
    getRatingReviews();
    getProeductQuestionair();
  }, []);

// method to get all product question and answers for perticular product
const getProeductQuestionair = async () => {
  if(searchAnswers !== undefined && searchAnswers !== null && searchAnswers !== ""){
    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductQuestionair/product-id/${params.productId}/product-questionair-details?search=${searchAnswers}`  
    ); 
    setProductQuestionair(response.data.result);
  }
  else{
    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductQuestionair/product-id/${params.productId}/product-questionair-details`  
    );
    setProductQuestionair(response.data.result);
  }    
  
};

   // method to get all product rating and reviews for perticular product
   const getRatingReviews = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/ProductRatings/product-id/${params.productId}/rating-reviews`
    );    
    for (let i = 0; i < response.data.result.length; i++) {
    sumOfAllRating = sumOfAllRating + response.data.result[i].rating;
      totalRatingCount = response.data.result.length;
      averageratingCount = (
        sumOfAllRating / response.data.result.length
      ).toFixed(1);
    }
    setTotalRatings(totalRatingCount);
    setAverageRating(averageratingCount);
  };

  // method to get product based on id
  const getproductData = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Products/RetrieveProductList/products?ProductId=${params.productId}`
    );
    setProductbasedonId(response.data.result);
  };

  const closeModel = () => setShowwModel(false);

  const  handleQuestions = (value) =>{
    setsearchAnswers(value);
    getProeductQuestionair();
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
                    key={data.productId}
                  />
                </Link>
              </div>
              <Link
                className="ratingProductname"
                to={`/productdetails/${params.productId}`}
                style={{ marginLeft: "1px" }}
              >
                {data.productName.slice(0, 30)}...
              </Link>
              <div
                            className="d-flex flex-row my-1"
                            style={{ marginLeft: "-4px" }}
                          >
                            <span
                              className="badge mx-1"
                              style={{
                                width: "40px",
                                height: "20px",
                                backgroundColor: "#388e3c",
                                fontSize: "12px",
                              }}
                            >
                              {averageRating}

                              <AiFillStar
                                style={{
                                  height: "11px",
                                  width: "11px",
                                  marginTop: "-4px",
                                  marginLeft:"2px"
                                }}
                              />
                            </span>
                            <span className="text-muted mx-1" style={{marginTop:"-4px"}}>
                              ({totalRatings})
                            </span>
                          </div>
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
                <span className="text-success mx-1 h6">
                  {((data.productDiscount / data.productPrice) * 100).toFixed(
                    2
                  )}
                  % off
                </span>
              </div>             
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
            Questions and Answers
          </p>
          <div className="questionSearch">
            <input
              type="text"
              placeholder="Have question? Search for answers"    
              onChange={(e) => handleQuestions(e.target.value)}          
            />
            <FaSearch className="icons" />
          </div>
          <hr
            style={{
              border: "1px solid #f0f0f0",
              marginLeft: "-15px",
              marginTop: "10px",
            }}
          ></hr>
           <div style={{display:"flex"}}>
          <p>Didn't get right answers you are looking for</p>
          <button style={{
            boxShadow: "0 1px 2px 0 rgba(0,0,0,.26)",
            border: "none",
            color: "#212121",
            fontSize: "14px",
            width: "232px",
            padding: "16px 0",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
            textTransform: "capitalize",
            fontWeight:500,
            marginLeft:"370px"
          }}
          onClick={() => setShowwModel(true)}
          >
          Post Your Question
          </button>
          {showModel && <PostQuestions closeModel = {closeModel}/>}
        </div>
        </div>
        {getProductQuestionair.map((data) => {
          return(
            <div>
            <h6 className="my-4">Q: {data.questions}?</h6>
            <p style={{ marginTop: "-10px" }}>
              A: {data.answers}
            </p>
            <div style={{ display: "flex"}}>
            <IoIosCheckmarkCircle
              style={{ color: "gray" }}
            />
            <p
              className="mx-1"
              style={{ marginTop: "-5px", color: "gray" }}
            >
              Certified Buyer
            </p>
          </div>
            <hr />
          </div>

          )
        })}       
      </div>
    </div>
  );
}

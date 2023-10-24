import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsHeart } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";
import { FaAngleRight } from "react-icons/fa";
import "./Mens.css";



export default function TopTrending() {
  const [productdata, setProductData] = useState([]);
  let [username, setUsername] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const getproductData = async () => {
      const response = await axios.get(
        "https://localhost:7274/api/Products/RetrieveProductList/products?Category=Mens%20Wear"
      );
      for (let i = 0; i < response.data.result; i++) {
        if (response.data.result === 5) {
          break;
        }
      }
      setProductData(response.data.result);
    };
    getproductData();
    setUsername(localStorage.getItem("email"));
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
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
      <Link to={`/productdetails/${data.productId}`} id="productLink">
        <div
          className="card bg-body rounded"
          style={{ border: "none", width: "180px", height: "190px" }}
        >
          <img
            src={data.productImageurl}
            className="card-img-top"
            alt="Laptop"
            id="cardImage"
            style={{ height: "150px", width: "130px" }}
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
  return (
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
      <h4 style={{ marginLeft: "16px" }}> Top Trendings</h4>
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
  );
}

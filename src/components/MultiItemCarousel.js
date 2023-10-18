import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsHeart } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";
import TopTrending from "./TopTrending";
import "./Mens.css";

export default function MultiItemCarousel() {
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

  const handleWishList = () => {
    if (username === "" || username === null || username === undefined) {
      navigate("/signin");
    } else {
      navigate("/wishlist");
    }
  };
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
    <div className="container">
      <Link to={`/productdetails/${data.productId}`} id="productLink">
        <div
          className="card bg-body rounded"
          style={{ border: "none", width: "180px" }}
        >
          <div className="d-flex">
            <div className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong">
              <Link
                className="btn btn-white px-2"
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
                  {data.productName.slice(0, 15)}
                </a>
              </p>
              <p className="small text-danger">
                <s>&#8377; {data.productPrice}</s>
              </p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <p className="mb-0" id="prodcutDesc">
                {data.productDescription.slice(0, 10)}
              </p>
              <h5 className="text-dark mb-0">&#8377; {data.productDiscount}</h5>
            </div>

            <div className="d-flex justify-content-between mb-2" id="stockId">
              <p className="text-muted mb-0" id="stockId">
                {data.productQuanitity} In stock
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));
  return (
    <div>
      <Carousel responsive={responsive}>{product}</Carousel>;
    </div>
  );
}

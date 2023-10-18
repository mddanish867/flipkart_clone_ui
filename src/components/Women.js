import { useState, useEffect } from "react";
import React from "react";
import "./Women.css";
import axios from "axios";

export default function Women() {
  const [userdata, setData] = useState([]);
  const [productdata, setProductData] = useState([]);
  // const [subCategory, setSubcategory] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://localhost:7274/api/Account/RetrieveSubCategoryDetails/subcategories?Category=Womens%20Wear"
      );
      setData(response.data.result);
    };
    getData();
    // const getproductData = async () => {
    //   const response = await axios.get(
    //     "https://localhost:7274/api/Products/RetrieveProductsDetails/products?Category=Womens%20Wear"
    //   );
    //   setProductData(response.data.result);
    // };
    // getproductData();
    
  }, []);
 
  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            {/* <!-- Pills navs --> */}
            <ul className="nav nav-pills mb-3 my-2" id="ex1" role="tablist">
              {userdata.map((data) => {
                return (
                  <>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="ex1-tab-2"
                        data-mdb-toggle="pill"
                        href="#ex1-pills-2"
                        role="tab"
                        aria-controls="ex1-pills-2"
                        aria-selected="false"
                      >
                        {data.subCategory}
                        {/* onChange = {e => setSubcategory(e.target.value)} */}
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
            {/* <!-- Pills navs --> */}

          </div>
        </div>
      </div>    
      <div>
        <section id="sectionsId">
          <div className="container py-5">
            <div className="row">
              <h3 id="topTrending">Top Trendings</h3>
              {productdata.map((data) => {
return(
              <div className="col-md-12 col-lg-4 mb-4 mb-lg-0 ">
                <div className="card">
                  {/* <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0">Today's Combo Offer</p>
                    <div
                      className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      id="rounded-circle"
                    >
                      <p className="text-white mb-0 small">x4</p>
                    </div>
                  </div> */}
                  <img
                    src={data.productImageurl}
                    className="card-img-top"
                    alt="Laptop"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="small">
                        <a href="#!" className="text-muted">
                          {data.subCategory}
                        </a>
                      </p>
                      <p className="small text-danger">
                        <s>${data.productPrice}</s>
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{data.productDescription}</h5>
                      <h5 className="text-dark mb-0">${data.productDiscount}</h5>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <p className="text-muted mb-0">
                        Available: <span className="fw-bold">{data.productQuanitity}</span>
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
              </div>
              )})
}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

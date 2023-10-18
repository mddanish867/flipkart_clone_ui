import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SportsBooks() {
  const [userdata, setData] = useState([]);
  const [productdata, setProductData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://localhost:7274/api/Account/RetrieveSubCategoryDetails/subcategories?Category=Sports%20%26%20Books"
      );
      setData(response.data.result);
    };
    getData();

    
//     const getproductData = async () => {
//       const response = await axios.get(
// "https://localhost:7274/api/Products/RetrieveProductList/products?Category=Mens%20Wear"     
//  );
//       setProductData(response.data.result);
//     };
//     getproductData();
  }, []);
  return (
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
  )
}

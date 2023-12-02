import "./Navbar2.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";


export default function Navbar() {
  const [userdata, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://localhost:7274/api/Account/RetrieveCategoryDetails/categories"
      );
      setData(response.data.result);
    };
    getData();
  }, []);
  return (
    <div>
      {/* <!-- Navbar --> */}
      <nav
        className="navbar navbar-expand-lg"
        id="navbar1"
        style={{
          marginTop: "-15px",
          height: "40px",
          borderBottom: "1px solid lightgray",
        }}
      >
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
          {/* <!-- Navbar brand --> */}

          {/* <!-- Collapsible wrapper --> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userdata.map((data) => {
                for (let i = 0; i < data.category.length; i++) {
                  if (data.category === "Mens Wear") {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                        
                      >
                        <Link to="/mens" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                      
                    );
                    
                  } else if (data.category === "Womens Wear") {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                      >
                        <Link to="/women" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                    );
                  } else if (data.category === "Kids Wear") {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                      >
                        <Link to="/kidwear" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                    );
                  } else if (data.category === "Electronics") {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                      >
                        <Link to="/electronics" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                    );
                  } else if (data.category === "Appliances") {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                      >
                        <Link to="/appliances" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                    );
                  } else if (data.category === "Sports & Books") {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                      >
                        <Link to="/sportsbooks" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                    );
                  } else if (data.category === "Beauty & Health") {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                      >
                        <Link to="/beautyhealth" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                    );
                  } else if (data.category === "Home & Furniture") {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                      >
                        <Link to="/homefurniture" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="list-group-item px-3"
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        key={data.categoryId}
                      >
                        <Link to="/admindashboard" id="cat1">
                          {data.category}
                        </Link>
                        <RiArrowDropDownLine style={{height:"20px",width:"20px"}}/>
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </div>
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>

      {/* <!-- Navbar --> */}
    </div>
  );
}

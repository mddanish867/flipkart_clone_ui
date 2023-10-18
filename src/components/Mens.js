import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsHeart } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";
import "./Mens.css";

const Mens = () => {
  const [userdata, setData] = useState([]);
  const [productdata, setProductData] = useState([]);
  const [roductFound, setProductFound] = useState(0);
  const [toCheck, setToCheck] = useState({});
  let [username, setUsername] = useState("");
  let navigate = useNavigate();
  let subcategory = "";
  let setColorFilter = [];
  let setBrand = [];
  let setSize = [];
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://localhost:7274/api/Account/RetrieveSubCategoryDetails/subcategories?Category=Mens%20Wear"
      );
      setData(response.data.result);
    };
    getData();

    const getproductData = async () => {
      const response = await axios.get(
        "https://localhost:7274/api/Products/RetrieveProductList/products?Category=Mens%20Wear"
      );
      setProductData(response.data.result);
      setProductFound(response.data.result.length);
    };
    getproductData();

    setUsername(localStorage.getItem("email"));
  }, []);

  const filterProducts = (value) =>
  setToCheck((prev) => {
    return { ...prev, [value]: !!!prev[value]};
  });

  const   filterBrandProducts = (value) =>
  setToCheck((prev) => {
    return { ...prev, [value]: !!!prev[value]};
  });

  const filterSizeProducts = (value) =>
  setToCheck((prev) => {
    return { ...prev, [value]: !!!prev[value]};
  });
  const handleWishList = () => {
    if (username === "" || username === null || username === undefined) {
      navigate("/signin");
    } else {
      navigate("/wishlist");
    }
  };

  return (
    <>
      
        <div className="container">
          <div className="row">
            <aside className="col-md-3">
              <div className="card my-3" style={{ "border-radius": "0 0 0 0" }}>
                <article className="filter-group">
                  <header className="card-header">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h5 className="title">Filters</h5>
                  </header>
                  <div className="filter-content collapse show" id="collapse_1">
                    <div className="card-body">
                      <form className="pb-3">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-light" type="button">
                              <LiaSearchSolid />
                            </button>
                          </div>
                        </div>
                      </form>

                      <ul className="list-menu">
                        {userdata.map((data) => {
                          for (let i = 0; i < data.subCategory.length; i++) {
                            if (data.subCategory === "Shirt") {
                              return (
                                <>
                                  <li className="nav-item" role="presentation">
                                    <Link
                                      className="nav-link"
                                      id="ex1-tab-2"
                                      data-mdb-toggle="pill"
                                      to="/shirts"
                                      role="tab"
                                      aria-controls="ex1-pills-2"
                                      aria-selected="false"
                                    >
                                      {data.subCategory}
                                    </Link>
                                  </li>
                                </>
                              );
                            } else if (data.subCategory === "T-Shirt") {
                              return (
                                <>
                                  <li className="nav-item" role="presentation">
                                    <Link
                                      className="nav-link"
                                      id="ex1-tab-2"
                                      data-mdb-toggle="pill"
                                      to="/tshirts"
                                      role="tab"
                                      aria-controls="ex1-pills-2"
                                      aria-selected="false"
                                    >
                                      {data.subCategory}
                                    </Link>
                                  </li>
                                </>
                              );
                            } else if (data.subCategory === "Shoes") {
                              return (
                                <>
                                  <li className="nav-item" role="presentation">
                                    <Link
                                      className="nav-link"
                                      id="ex1-tab-2"
                                      data-mdb-toggle="pill"
                                      to="/shoes"
                                      role="tab"
                                      aria-controls="ex1-pills-2"
                                      aria-selected="false"
                                    >
                                      {data.subCategory}
                                    </Link>
                                  </li>
                                </>
                              );
                            } else if (data.subCategory === "Blazer") {
                              return (
                                <>
                                  <li className="nav-item" role="presentation">
                                    <Link
                                      className="nav-link"
                                      id="ex1-tab-2"
                                      data-mdb-toggle="pill"
                                      to="/blazer"
                                      role="tab"
                                      aria-controls="ex1-pills-2"
                                      aria-selected="false"
                                    >
                                      {data.subCategory}
                                    </Link>
                                  </li>
                                </>
                              );
                            } else if (data.subCategory === "Jeans") {
                              return (
                                <>
                                  <li className="nav-item" role="presentation">
                                    <Link
                                      className="nav-link"
                                      id="ex1-tab-2"
                                      data-mdb-toggle="pill"
                                      to="/jeans"
                                      role="tab"
                                      aria-controls="ex1-pills-2"
                                      aria-selected="false"
                                    >
                                      {data.subCategory}
                                    </Link>
                                  </li>
                                </>
                              );
                            } else if (data.subCategory === "Watches") {
                              return (
                                <>
                                  <li className="nav-item" role="presentation">
                                    <Link
                                      className="nav-link"
                                      id="ex1-tab-2"
                                      data-mdb-toggle="pill"
                                      to="/watches"
                                      role="tab"
                                      aria-controls="ex1-pills-2"
                                      aria-selected="false"
                                    >
                                      {data.subCategory}
                                    </Link>
                                  </li>
                                </>
                              );
                            } else if (data.subCategory === "Formal") {
                              return (
                                <>
                                  <li className="nav-item" role="presentation">
                                    <Link
                                      className="nav-link"
                                      id="ex1-tab-2"
                                      data-mdb-toggle="pill"
                                      to="/formals"
                                      role="tab"
                                      aria-controls="ex1-pills-2"
                                      aria-selected="false"
                                    >
                                      {data.subCategory}
                                    </Link>
                                  </li>
                                </>
                              );
                            }
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">PRICE RANGE </h6>
                  </header>
                  <div className="filter-content collapse show" id="collapse_3">
                    <div className="card-body">
                      <input
                        type="range"
                        className="custom-range"
                        min="0"
                        max="100"
                        name=""
                      />
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Min</label>
                          <input
                            className="form-control"
                            placeholder="$0"
                            type="number"
                          />
                        </div>
                        <div className="form-group text-right col-md-6">
                          <label>Max</label>
                          <input
                            className="form-control"
                            placeholder="$1,0000"
                            type="number"
                          />
                        </div>
                      </div>
                      <button className="btn btn-block btn-primary">
                        Apply
                      </button>
                    </div>
                  </div>
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">BRANDS </h6>
                  </header>
                  {productdata.map((data) => {
                    if (!setBrand.includes(data.brands)) {
                      setBrand.push(data.brands);
                    }
                  })}
                   {setBrand.map((data, index) => {
                    return (
                      <div className="filter-content collapse show" id="collapse_2">
                      <div className="card-body">
                        <label className="custom-control custom-checkbox">
                          <input
                           type="checkbox"
                           className="custom-control-input"
                           id={`flexCheckDefault-${index}`}
                           onChange={(e) => filterBrandProducts(e.target.value)}
                           value={data}
                          />
                          <div className="custom-control-label">
                            {data}
                            <b className="badge badge-pill badge-warning float-right">
                              120
                            </b>
                          </div>
                        </label>
                        
                      </div>
                    </div>
                    )

                   })}
                  
                 
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">DISCOUNT </h6>
                  </header>
                  <div className="filter-content collapse show" id="collapse_2">
                    <div className="card-body">
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">30% and more</div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">40% and more</div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">50% and more</div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">60% and more</div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">70% and more</div>
                      </label>
                    </div>
                  </div>
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">SIZES </h6>
                  </header>
                  {productdata.map((data) => {
                    if (!setSize.includes(data.size)) {
                      setSize.push(data.size);
                    }
                  })}
                   {setSize.map((data, index) => {
                    return(
                      <div
                      className="filter-content collapse show"
                      id="collapse_2"
                    >
                      <div className="card-body">
                        <label className="custom-control custom-checkbox">
                        <input type="checkbox"
                        className="custom-control-input"
                        id={`flexCheckDefault-${index}`}
                        onChange={(e) => filterSizeProducts(e.target.value)}
                        value={data}
                        />
                          <div className="custom-control-label">{data} </div>
                        </label>
                      </div>
                    </div>
                    )
})}
                  
                </article>

                <article className="filter-group">
                  <header className="card-header">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">COLORS </h6>
                  </header>
                  {productdata.map((data) => {
                    if (!setColorFilter.includes(data.color)) {
                      setColorFilter.push(data.color);
                    }
                  })}
                  {setColorFilter.map((data, index) => {
                    return (
                      <div
                        className="filter-content collapse show"
                        id="collapse_2"
                      >
                        <div className="card-body">
                          <label className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`flexCheckDefault-${index}`}
                              onChange={(e) => filterProducts(e.target.value)}
                              value={data}
                            />
                            <div className="custom-control-label">{data} </div>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </article>

                <article className="filter-group">
                  <header className="card-header">
                    <i className="icon-control fa fa-chevron-down"></i>
                    <h6 className="title">SLEEVES </h6>
                  </header>
                  <div className="filter-content collapse show" id="collapse_2">
                    <div className="card-body">
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">Full Sleeves</div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">Half Sleeves</div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">Sleeveless</div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Roll Up Sleeves
                        </div>
                      </label>
                    </div>
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-md-9 my-2">
             

              <section id="mensSection my-4">
                <div className="container">
                  <div className="row">
                    {productdata
                    .filter((data) =>
                    Object.keys(toCheck).length === 0 ? true : !!toCheck[data.color,data.brands])
                    .map((data) =>{
                      return (
                        <div
                          className=" col-12 col-md-12 col-lg-3 mb-4 mb-lg-0 my-3 mx-0"
                          id="roundedCircle"
                        >
                          <Link
                            to={`/productdetails/${data.productId}`}
                            id="productLink"
                          >
                            <div className="card bg-body rounded">
                              <div className="d-flex justify-content-between p-2">
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
                                  <h5 className="text-dark mb-0">
                                    &#8377; {data.productDiscount}
                                  </h5>
                                </div>

                                <div
                                  className="d-flex justify-content-between mb-2"
                                  id="stockId"
                                >
                                  <p className="text-muted mb-0" id="stockId">
                                    {data.productQuanitity} In stock
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
                          </Link>
                        </div>
                      );
                    })}               
                     
                    
                  </div>
                </div>
              </section>

              <nav className="mt-4" aria-label="Page navigation sample">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </main>
          </div>
        </div>
    
    </>
  );
};
export default Mens;

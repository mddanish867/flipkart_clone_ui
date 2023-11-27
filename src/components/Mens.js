import React from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsHeart } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";
import "./Mens.css";
import Swal from 'sweetalert2';
import { borderTop } from "@mui/system";

// select * from Products where (ProductDiscount Between 200 and 300) and ( Brands in ('Egolo','Polo') and Size in ('L','M') and Color in('Green','Red') and Sleeve in ('Half Sleeve'))


const Mens = () => {
  const [userdata, setData] = useState([]);
  const [productdata, setProductData] = useState([]);
  const [mensCategory, setMensCategory] = useState([]);
  const [roductFound, setProductFound] = useState(0);  
  const [toCheck, setToCheck] = useState(""); // need to remove
  const [existingProductId, setExistingProductId] =useState(0);
  const [hideSleevs, setHideSleeves] = useState(false)
  const [hideColor, setHideColor] = useState(false)
  const [hideSize, setHideSize] = useState(false);
  const [hideDiscount, setHideDiscount] = useState(false);
  const [hideBrand, setHideBrand] = useState(false);
  const [filterColor, setfilterColor] = useState([]);
  const [filterBrand, setfilterBrand] = useState([]);
  const [filterSize, setfilterSize] = useState([]);
  const [filterDiscount, setfilterDiscount] = useState(0);
  const [filterSleeve, setfilterSleeve] = useState([]);
  const [filterMinPrice, setfilterMinPrice] = useState(0);
  const [filterMaxPrice, setfilterMaxPrice] = useState(0);
  const [rangeData,setRangeData] = useState(0);
  let [username, setUsername] = useState("");  
  let navigate = useNavigate();
  let subcategory = "";
  let setColorFilter = [];
  let setBrand = [];
  let setSize = [];
  let setDiscount = [];
  let setSleeveFilter = [];
  let setfilterSleeves = [];
  let params = useParams();

  useEffect(() => {    
    getData();    
    getproductData();
    setUsername(localStorage.getItem("email"));
    // checkExistingProduct();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://localhost:7274/api/Account/RetrieveSubCategoryDetails/subcategories?Category=Mens%20Wear"
    );
    setData(response.data.result);
  };

  const getproductData = async () => {
    const response = await axios.get("https://localhost:7274/api/Products/RetrieveProductList/products?Category=Mens%20Wear");
    setProductData(response.data.result);
    setMensCategory(response.data.result)
    setProductFound(response.data.result.length);
  }

    const FilterProeducts = async (
      filterMinPrice,
      filterMaxPrice,
      filterDiscount,
      filterColor,
      filterBrand,
      filterSize,
      filterSleeve
    ) => {
      let apiUrl = "https://localhost:7274/api/Products/FilterProducts/filters";
      if (filterMinPrice && filterMaxPrice) {
        apiUrl += `?MinPrice=${filterMinPrice}&MaxPrice=${filterMaxPrice}`;
      }
      if (filterDiscount) {
        apiUrl += `?Discount=${filterDiscount}`;
      }
      if (filterColor) {
        apiUrl += `?Color=${filterColor}`;
      }
      if (filterBrand) {
        apiUrl += `?Brand=${filterBrand}`;
      }
      if (filterSize) {
        apiUrl += `?Size=${filterSize}`;
      }
      if (filterSleeve) {
        apiUrl += `?Sleeve=${filterSleeve}`;
      }

      const response = await axios.get(apiUrl);
      setMensCategory(response.data.result);
    };
  

  const filterProductsBasedOnColor = (e) =>{
    const {value,checked} = e.target;
    if(checked){
      setfilterColor([...filterColor,value]);
    }
    else{
      setfilterColor(filterColor.filter((e) => e!== value));
    }
    FilterProeducts();
    console.log(filterColor)
    };

  const filterBrandProducts = (e) => {
    const {value,checked} = e.target;
    if(checked){
      setfilterBrand([...filterBrand,value]);
      console.log(filterBrand)
    }
    else{
      setfilterBrand(
      filterBrand.filter((e) => e !== value)      
      );    
      console.log(filterBrand)
    }
    FilterProeducts();
    };

  const filterSizeProducts = (e) =>{
    const {value,checked} = e.target;
    if(checked){
      setfilterSize([...filterSize,value]);
    }
    else{
      setfilterSize(filterSize.filter((e) => e!== value));
    }
    FilterProeducts();
    };

    const filterDiscountProducts = (e) =>{
      const {value,checked} = e.target;
    if(checked){
      setfilterDiscount([...filterDiscount,value]);
    }
    else{
      setfilterDiscount(filterDiscount.filter((e) => e!== value));
    }
    FilterProeducts();
    }

    const filterProductsBasedOnSleeve = (e) => {
      const {value,checked} = e.target;
    if(checked){
      setfilterSleeve([...filterSleeve,value]);
    }
    else{
      setfilterSleeve(filterSleeve.filter((e) => e!== value));
    }
    FilterProeducts();
    }  

    const filterProductBasedonMinPrice = (e) =>{
      setfilterMinPrice(e.target.value);
      FilterProeducts();
    }

    const filterProductBasedonMaxPrice = (e) =>{
      setfilterMaxPrice(e.target.value);
      FilterProeducts();
    }
    

  // Show / Hide Sleeves button Filter
  function ShowSleevesFilter(){
    if(hideSleevs === false){
      setHideSleeves(true);
    }
    else{
      setHideSleeves(false);
    }
  }

  // SHow / Hide Color button filter
  function ShowColorFilter(){
    
    if(hideColor === false){
      setHideColor(true);
    }
    else{
      setHideColor(false);
    }
  }

  // Show / Hide Size button Filter
  function ShowSizeFilter(){
    if(hideSize === false){
      setHideSize(true);
    }
    else{
      setHideSize(false);
    }
  }

  // Show / Hide Discont button Filter
  function ShowDiscountFilter (){
    if(hideDiscount === false){
      setHideDiscount(true);
    }
    else{
      setHideDiscount(false);
    }
  }

  // Show / Hide Brand button Filter
  function ShowBrandFilter(){
    if(hideBrand === false){
      setHideBrand(true);
    }
    else{
      setHideBrand(false);
    }
  }

  // method to check if the products is already exists into cart or not
  // const checkExistingProduct = async () => {
  //   const response = await axios.get(
  //     `https://localhost:7274/api/Cart/RetrieveCartDetails/cart?ProductId=${params.productId}`
  //   );   
  //   setExistingProductId(response.data.result[0].productId);
  // };

   // Method to add the products ino favourites
   const handleWishList = (productId) => {
    let flag = false;
      if (existingProductId.toString() === params.productId) {
        flag = true;        
      }
    
    if (flag === false) {
      const data = {       
        ProductId: productId,
        UserName: username,
        errormessage: "",
      };
      const url = "https://localhost:7274/api/Products/AddProductstoFavourite/favourites";
      axios
        .post(url, data)
        .then((result) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: (result.data.message),
            showConfirmButton: false,
            timer: 1500
          })
          if (result.data.message === "OK") {
            window.location.reload();
            navigate("/wishlist");
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: {error}
          })
        });
    }
  };

  return (
    <>
      <section style={{ backgroundColor: "#f1f3f6" }}>
        <div className="row">
          {/* Start Filters the products */}
          <aside className="col-md-3 my-1" style={{ marginLeft: "8px",width:"295px" }}>
            <div className="card" style={{ borderRadius: "0 0 0 0",marginTop:"4px",border:"none" }}>
              {/* Start Filter Product by Category */}
              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "#fff" }}
                >
                  <i className="icon-control fa fa-chevron-down"></i>
                  <h5 className="title">Filters</h5>
                </header>

                <div className="filter-content collapse show" id="collapse_1">
                  <h6 style={{ marginLeft: "18px", marginTop: "10px" }}>
                    Search by Category
                  </h6>
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
              {/* End Filter Product by Catefgory */}

              {/* Start Filter Product by Price Range */}
              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "#fff" }}
                >
                  <i className="icon-control fa fa-chevron-down"></i>
                  <h6 className="title">PRICE RANGE </h6>
                </header>
                <div className="filter-content collapse show" id="collapse_3">
                  <div className="card-body">
                    <input
                      type="range"
                      className="custom-range"
                      min="0"
                      max="10000"
                      step="100"
                      name=""     
                      value={rangeData}
                      onChange={(e) => setRangeData(e.target.value)}                 
                    />
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Min</label>
                        <input
                          className="form-control"
                          placeholder="$0"
                          type="number"
                          
                          onChange={filterProductBasedonMinPrice}
                          value={filterMinPrice}
                        />
                      </div>
                      <div className="form-group text-right col-md-6">
                        <label>Max</label>
                        <input
                          className="form-control"
                          placeholder="$1,0000"
                          type="number"
                          onChange={filterProductBasedonMaxPrice}
                          value={filterMaxPrice}
                        />
                      </div>
                    </div>
                    <button className="btn btn-block btn-primary">Apply</button>
                  </div>
                </div>
              </article>
              {/* End Filter Product by Price Range */}

              {/* Start Filter Product by Brands */}
              <article className="filter-group">
                <header
                  className="card-header"
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: "28px",
                    display: "flex",
                  }}
                >
                  <button
                    onClick={ShowBrandFilter}
                    style={{
                      border: 0,
                      backgroundColor: "#fff",
                      marginLeft: "231px",
                    }}
                  >
                    <i className="icon-control fa fa-chevron-down"></i>
                  </button>
                  <h6 className="title" style={{ marginLeft: "-265px" }}>
                    BRANDS{" "}
                  </h6>
                </header>
                {hideBrand ? (
                  <div>
                    {productdata.map((data) => {
                      if (!setBrand.includes(data.brands)) {
                        setBrand.push(data.brands);
                      }
                    })}
                    {setBrand.map((data, index) => {
                      return (
                        <div
                          className="filter-content collapse show"
                          id="collapse_2"
                        >
                          <div
                            className="card-body"
                            style={{ marginTop: "-13px" }}
                          >
                            <label
                              className="custom-control custom-checkbox"
                              style={{ marginTop: "-20px" }}
                            >
                              <input
                                type="checkbox"
                                value={data}
                                className="custom-control-input"
                                id={`flexCheckDefault-${index}`}                               
                                onChange={filterBrandProducts}
                              />
                              <div className="custom-control-label">{data}</div>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </article>
              {/* End Filter Product by Brands */}

              {/* Start Filter Product by discount */}
              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "#fff", display: "flex",marginTop:"-28px" }}
                >
                  <button
                    onClick={ShowDiscountFilter}
                    style={{
                      border: 0,
                      backgroundColor: "#fff",
                      marginLeft: "231px",
                    }}
                  >
                    <i className="icon-control fa fa-chevron-down"></i>
                  </button>
                  <h6 className="title" style={{ marginLeft: "-265px" }}>
                    DISCOUNT
                  </h6>
                </header>
                {hideDiscount ? (
                  <div style={{marginTop:"26px"}}>
                    {productdata.map((data) => {
                      if (!setDiscount.includes(data.percDiscount)) {
                        setDiscount.push(data.percDiscount);
                      }
                    })}
                    {setDiscount.map((data, index) => {
                      return(<div className="filter-content collapse show" id="collapse_2">
                      <div className="card-body" >
                        <label className="custom-control custom-checkbox" style={{ marginTop: "-40px" }}>
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id = {`flexCheckDefault-${index}`}
                            onChange={(e) =>
                              filterDiscountProducts(e.target.value)
                            }
                            value={data}
                          />
                          <div className="custom-control-label">{data}% or more</div>
                        </label>                        
                      </div>
                    </div>
                    );
                  })}
                  </div>
                  
                ) : (
                  ""
                )}
              </article>
              {/* End Filter Product by discount */}

              {/* Start Fiter Product by Size */}
              <article className="filter-group">
                <header
                  className="card-header"
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: "28px",
                    display: "flex",
                  }}
                >
                  <button
                    onClick={ShowSizeFilter}
                    style={{
                      border: 0,
                      backgroundColor: "#fff",
                      marginLeft: "231px",
                    }}
                  >
                    <i className="icon-control fa fa-chevron-down"></i>
                  </button>
                  <h6 className="title" style={{ marginLeft: "-265px" }}>
                    SIZES{" "}
                  </h6>
                </header>
                {hideSize ? (
                  <div>
                    {productdata.map((data) => {
                      if (!setSize.includes(data.size)) {
                        setSize.push(data.size);
                      }
                    })}
                    {setSize.map((data, index) => {
                      return (
                        <div
                          className="filter-content collapse show"
                          id="collapse_2"
                        >
                          <div
                            className="card-body"
                            style={{ marginTop: "-13px" }}
                          >
                            <label
                              className="custom-control custom-checkbox"
                              style={{ marginTop: "-20px" }}
                            >
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`flexCheckDefault-${index}`}
                                onChange={(e) =>
                                  filterSizeProducts(e.target.value)
                                }
                                value={data}
                              />
                              <div className="custom-control-label">
                                {data}{" "}
                              </div>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </article>
              {/* End Fiter Product by Size */}

              {/* Start Filter Product by Color */}
              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "#fff", display: "flex", marginTop:"-28px" }}
                >
                  <button
                    onClick={ShowColorFilter}
                    style={{
                      border: 0,
                      backgroundColor: "#fff",
                      marginLeft: "231px",
                    }}
                  >
                    <i className="icon-control fa fa-chevron-down"></i>
                  </button>
                  <h6 className="title" style={{ marginLeft: "-265px" }}>
                    COLORS
                  </h6>
                </header>

                {hideColor ? (
                  <div style={{marginTop:"26px"}}>
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
                          <div
                            className="card-body"                            
                          >
                            <label
                              className="custom-control custom-checkbox"
                              style={{ marginTop: "-40px" }}
                            >
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`flexCheckDefault-${index}`}
                                onChange={(e) => filterProductsBasedOnColor(e)}
                                value={data}
                              />
                              <div className="custom-control-label">
                                {data}{" "}
                              </div>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </article>
              {/* End Filter Product by Color */}

              {/* Start Filter Product by Sleeves */}
              <article className="filter-group">
                <header
                  className="card-header"
                  style={{ backgroundColor: "#fff", display: "flex" }}
                >
                  <button
                    onClick={ShowSleevesFilter}
                    style={{
                      border: 0,
                      backgroundColor: "#fff",
                      marginLeft: "231px",
                    }}
                  >
                    <i className="icon-control fa fa-chevron-down"></i>
                  </button>
                  <h6 className="title" style={{ marginLeft: "-265px" }}>
                    SLEEVES
                  </h6>
                </header>
                {hideSleevs ? (
                  <div style={{marginTop:"26px"}}>
                    {productdata.map((data) => {
                      if (!setfilterSleeves.includes(data.sleeve)) {
                        setfilterSleeves.push(data.sleeve);
                      }
                    })}
                    {setfilterSleeves.map((data, index) => {
                    return(
                      <div className="filter-content collapse show" id="collapse_2">
                    <div className="card-body">
                      <label className="custom-control custom-checkbox" style={{ marginTop: "-40px" }}>
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={`flexCheckDefault-${index}`}
                                onChange={(e) => filterProductsBasedOnSleeve(e)}
                                value={data}
                        />
                        <div className="custom-control-label">{data}</div>
                      </label>                      
                    </div>
                  </div>
                    );
                  })}
                  </div>
                 
                ) : (
                  ""
                )}
              </article>
              {/* End Filter Product by Sleeves */}
            </div>
          </aside>
          {/* End Filters the products */}

          {/* Start Bind the Product based on the filters */}
          <main
            className="col-md-9 my-2"
            style={{ backgroundColor: "#fff", width: "963px" }}
          >
            <section id="mensSection my-1">
              <div className="row">
                {mensCategory.map((data) => {
                    return (
                      <div
                        className=" col-12 col-md-12 col-lg-4 mb-4 my-1"
                        id="roundedCircle"
                        style={{ marginRight: "-23px", width: "250px" }}
                      >
                        <Link
                          to={`/productdetails/${data.productId}`}
                          id="productLink"
                          key={data.productId}
                        >
                          <div className="card bg-body" style={{ border: 0 }}>
                            <div className="d-flex justify-content-between p-2">
                              <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                  border: 0,
                                  borderRadius: "0 0 0 0",
                                  marginLeft: "185px",
                                }}
                              >
                                <Link
                                  className="btn btn-white px-2"
                                  type="button"
                                  id="button-addon1"
                                  data-mdb-ripple-color="white"
                                  onClick={(e) =>
                                    handleWishList(data.productId)
                                  }
                                >
                                  <BsHeart style={{ color: "gray" }} />
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
                                  {data.productName.slice(0, 25)}
                                </p>
                                {/* <p className="mb-0" id="prodcutDesc">
                                    {data.productDescription.slice(0, 10)}
                                  </p> */}
                              </div>

                              <div className="d-flex justify-content-between mb-3">
                                <h5 className="text-dark mb-0">
                                  &#8377;{data.productDiscount}
                                </h5>
                                <p className="small text-muted">
                                  <s>&#8377;{data.productPrice}</s>
                                </p>
                                <p className="small text-success">
                                  <b>
                                    &#8377;
                                    {(
                                      (data.productDiscount /
                                        data.productPrice) *
                                      100
                                    ).toFixed(2)}{" "}
                                    off
                                  </b>
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
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
          {/* End Bind the Product based on the filters */}
        </div>
      </section>
    </>
  );
};
export default Mens;

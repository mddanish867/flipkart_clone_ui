import React from "react";
import axios from "axios";
import "./Cart.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";
import Swal from 'sweetalert2';


export default function Cart() {
  const [getProductId, setProductId] = useState([]);
  const [count, setCount] = useState(1);
  const [state, setState] = useState(false);
  let [afterDiscount, setAfterDiscount] = useState(0);
  let [actualPrice, setActualPrice] = useState(0);
  let [username, setUsername] = useState("");
  let [itemCount, setItemCopunt] = useState(0);
  let productCount = 0;
  let navigate = useNavigate();
  let setSubTotal = 0;
  let priceofProduct = 0;
  let params = useParams();
  let retreiveButtontext = "";
  useEffect(() => {
    getproductData();
    setUsername(localStorage.getItem("email"));    
  }, []);

  const getproductData = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Cart/RetrieveCartDetails/cart?UserName=${localStorage.getItem("email")}`
    );
    for (let i = 0; i < response.data.result.length; i++) {
      priceofProduct = priceofProduct + response.data.result[i].productPrice;
      setSubTotal = setSubTotal + response.data.result[i].productDiscount;
      setActualPrice(priceofProduct);
      setAfterDiscount(setSubTotal);
      setItemCopunt(response.data.result.length);
      productCount = response.data.result.length;     
    }
    setProductId(response.data.result);
  };

  const handleRemoveFromCart = (productId) => {
    Swal.fire({
      title: 'Are you sure you want to remove this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2874f0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `https://localhost:7274/api/Cart/RemoveProduct/product-id/${productId}/cart`;
        axios
          .delete(url)
          .then((result) => {   
           
            
          })
          .catch((error) => {
            alert(error);
          });
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully removed from your cart',
            showConfirmButton: false,
            timer: 1500
          })
        window.location.reload();
      }
    })
    
  };

  const handlePlaceOrder = (e) => {    
    if (username !== "" || username !== null || username !== undefined) {
      retreiveButtontext = e.target.innerHTML;
      sessionStorage.setItem("setButtonText",retreiveButtontext); 
    }
    else{
      navigate("/signin");
    } 
  };

  // method to decrease the products count
  const handleDecrement = () => {
    count > 1 ? setCount(count - 1) : setCount(1);
  };

  const handleShopNow = () => {
    navigate("/");
  };
  return (
    <>
      <div>
        {getProductId.length > 0 ? (
          <section className="bg-light border-top py-4">
            <div className="container">
              <div className="row gx-4">
                <div className="col-lg-8 mb-4">
                  <div className=" px-3 py-2 ">
                    {getProductId.map((data) => {
                      // productId = data.productId
                      return (
                        <div className="py-1 col-12 mx-1 pull-left">
                          <div className="row justify-content-center mb-3" style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)" }}>
                            <div className="card shadow-4 mx-1">
                              <div className="card-body" key={data.productId}>
                                <div className="row">
                                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                      <img
                                        src={data.productImageurl}
                                        className="w-100"
                                        alt=""
                                      />
                                      <Link>
                                        <div className="hover-overlay">
                                          <div
                                            className="mask"
                                            id="maskNewArrival"
                                          ></div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 col-xl-6">
                                    <h5>{data.productName.slice(0, 30)}</h5>

                                    <div className="d-flex flex-row">
                                      <div className="d-flex flex-row align-items-center mb-1">
                                        <span>
                                          <s>&#8377;{data.productPrice}</s>
                                        </span>
                                        <h4 className="mb-1 me-1 mx-2">
                                          &#8377;{data.productDiscount}
                                        </h4>
                                        <span className="text-success mx-2">
                                          <b>
                                            {(
                                              (data.productDiscount /
                                                data.productPrice) *
                                              100
                                            ).toFixed(2)}
                                            % off
                                          </b>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                      Size:{" "}
                                      <span className="mx-2">
                                        {" "}
                                        {data.size}{" "}
                                      </span>
                                    </div>
                                    <div className="d-flex flex-row">
                                      Color:{" "}
                                      <span className="mx-2">
                                        {" "}
                                        {data.color}{" "}
                                      </span>
                                    </div>

                                    <div
                                      className="input-group mb-3 my-1"
                                      style={{ display: "flex" }}
                                    >
                                      <button
                                        className="btn btn-white px-3"
                                        type="button"
                                        style={{ width: "50px" }}
                                        data-mdb-ripple-color="dark"
                                        disabled={state}
                                        onClick={handleDecrement}
                                      >
                                        <FiMinus />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control text-center "
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                        id="countCartSet"
                                        value={count}
                                      />
                                      <button
                                        className="btn btn-white px-3"
                                        type="button"
                                        style={{ width: "50px" }}
                                        data-mdb-ripple-color="dark"
                                        onClick={() => setCount(count + 1)}
                                      >
                                        <BiPlus />
                                      </button>
                                      <Link
                                        className="btn btn-outline-primary btn-sm mt-2 mx-1"
                                        id="btnProductCartWish"
                                        to="/wishlist"
                                        type="button"
                                      >
                                        WISHLIST
                                      </Link>
                                      <button
                                        className="btn btn-outline-primary btn-sm mt-2 mx-1"
                                        id="btnProductcartRemove"
                                        type="button"
                                        onClick={(e) =>
                                          handleRemoveFromCart(data.productId)
                                        }
                                      >
                                        REMOVE
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*                   */}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-lg-4 my-2" style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",backgroundColor:"#fff" }}>
                  <div className="card" style={{border:"none"}}>
                    <div className="card-body">
                      <h5 className="card-title">Price Details</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          Price ({itemCount} item)
                          <span>&#8377; {count*actualPrice}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Discount
                          <span className="text-success">
                            -&#8377; {count*(actualPrice - afterDiscount)}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Delivery Charges
                          <span className="text-success">Free</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                          </div>
                          <span>
                            <strong>&#8377; {count*afterDiscount}</strong>
                          </span>
                        </li>
                      
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong className="text-success">
                              You will save &#8377;{" "}
                              {count*(actualPrice - afterDiscount)} on this order
                            </strong>
                          </div>
                        </li>                       
                      </ul>                                       
                    </div>                   
                  </div>
                  <div className="my-3" style={{backgroundColor:"white"}}>
                      <Link
                      to="/order/"
                        onClick={(e) => handlePlaceOrder(e)}
                        type="button"
                        className="btn btn-primary  btn-lg"
                        id="btnPlaceOrder"
                        style={{marginLeft:"50px", marginBottom:"18px",backgroundColor:"#fb641b",border:"none",width:"250px",position:"sticky",fontWeight:"600"}}
                      >
                        PLACE ORDER
                      </Link></div> 
                </div>
              </div>
            </div>
          </section>
        ) : (         

          <div className="py-1 col-md-12 mx-1 ">
            <div className="row justify-content-center">
              <div className="card ">
                <div className="card-body">
                  <div className="row">
                    <img
                      src="https://w7.pngwing.com/pngs/675/43/png-transparent-empty-cart-illustration-thumbnail.png"
                      alt=""
                      style={{
                        width: "300px",
                        height: "200px",
                        marginLeft: "440px",
                      }}
                    ></img>
                    <h6></h6> 
                    <button
                      className="btn btn-warning"
                      style={{
                        backgroundColor: "#fff",
                        width: "180px",
                        color: "black",
                        borderRadius: "0 0 0 0",
                        alignItems: "center",
                        marginLeft: "495px",
                        border:"none"
                      }}
                      
                    >
                      Missing Cart items?
                    </button>                   
                    <button
                      className="btn btn-warning"
                      style={{
                        backgroundColor: "#fb641b",
                        width: "150px",
                        color: "white",
                        borderRadius: "0 0 0 0",
                        alignItems: "center",
                        marginLeft: "508px",
                      }}
                      onClick={handleShopNow}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

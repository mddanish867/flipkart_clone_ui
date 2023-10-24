import React from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { GoPersonFill } from "react-icons/go";
import { BiSolidIdCard, BiLogOutCircle } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Account() {
    const [userInfo, setUserInfo] = useState([]);
    let userEmail = localStorage.getItem("email");
    const [updateEmailaddress, setUpdateEmail] = useState(false);
    let disableEmail = "true";
    let firstname = "";
    let lastname = "";
    useEffect(() => {
        getUserInfo();
      }, []);

     // method to get the user information
  const getUserInfo = async () => {
    const response = await axios.get(
      `https://localhost:7274/api/Account/RetrieveUserDetails/email/${userEmail}/users`
    );
    setUserInfo(response.data.result);  
    firstname = response.data.result[0].firstName + response.data.result[0].lastName;  
    console.log(firstname)
  };

  function updateEmail(){
    setUpdateEmail(true);
    disableEmail = "false";
  }

  return (
    <section style={{ backgroundColor: "#f1f3f6" }}>
      <div className="container">
        <div className="row" style={{ display: "flex" }}>
          <div className="col-3 my-3">
            <div
              style={{
                boxShadow: "0 2px 4px 0 rgba(0,0,0,.08",
                backgroundColor: "#fff",
              }}
            >
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="image" />
              <span className="mx-1">Hello,</span>
              <h5 className="title" style={{marginLeft:"53px"}}>{firstname}</h5>
            </div>
            <aside>
              <div
                className="card my-3"
                style={{
                  borderRadius: "0 0 0 0",
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,.08",
                }}
              >
                <article className="filter-group my-2">
                  <header
                    className="card-header"
                    style={{ backgroundColor: "white" }}
                  >
                    <h6 className="title">
                      <a href="#">
                        <BsFillArrowUpSquareFill style={{ colors: "blue" }} />{" "}
                        MY ORDERS
                      </a>{" "}
                    </h6>
                  </header>
                </article>

                <article className="filter-group">
                  <header
                    className="card-header"
                    style={{ backgroundColor: "white" }}
                  >
                    <h6 className="title">
                      <GoPersonFill style={{ colors: "blue" }} /> ACCOUNT
                      SETTINGS{" "}
                    </h6>
                  </header>
                  <div className="filter-content collapse show" id="collapse_2">
                    <div className="card-body">
                      <div className="my-4">Profile Information</div>

                      <div className="my-4">Manage Adresses</div>

                      <div className="my-4">PAN Information</div>
                    </div>
                  </div>
                </article>

                <article className="filter-group">
                  <header
                    className="card-header"
                    style={{ backgroundColor: "white" }}
                  >
                    <h6 className="title">
                      <MdPayments style={{ color: "blue" }} /> PAYMENTS{" "}
                    </h6>
                  </header>
                  <div className="filter-content collapse show" id="collapse_2">
                    <div className="card-body">
                      <div className="my-4">Gift Cards</div>

                      <div className="my-4">Saved UPI</div>

                      <div className="my-4">Saved Card</div>
                    </div>
                  </div>
                </article>

                <article className="filter-group">
                  <header
                    className="card-header"
                    style={{ backgroundColor: "white" }}
                  >
                    <h6 className="title">
                      <BiSolidIdCard style={{ color: "blue" }} /> MY STUFF{" "}
                    </h6>
                  </header>
                  <div className="filter-content collapse show" id="collapse_2">
                    <div className="card-body">
                      <div className="my-4">My Coupons</div>

                      <div className="my-4">My Reviews & Ratings</div>

                      <div className="my-4">All Notifications</div>

                      <div className="my-4">My Wishlist</div>
                    </div>
                  </div>
                </article>

                <hr />

                <article className="filter-group">
                  <header
                    className="card-header"
                    style={{ backgroundColor: "white" }}
                  >
                    <h6 className="title">
                      <BiLogOutCircle style={{ color: "blue" }} /> Logout{" "}
                    </h6>
                  </header>
                </article>
              </div>
            </aside>
            <div
              style={{
                boxShadow: "0 2px 4px 0 rgba(0,0,0,.08",
                backgroundColor: "#fff",
              }}
            >
              <span className="mx-1">Hello,</span>
              <h5 className="title">firstname + lastname</h5>
            </div>
          </div>
          {userInfo.map((data) => {
            firstname = data.firstName;
            lastname = data.lastName;
            return(            
            <div
            className="col-9 my-3"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.08",
            }}
          >
            <h6 className="my-4">
              Personal Infromation <a href="/" style={{textDecoration:"none"}}>Edit</a>
            </h6>
            <form className="row my-4">
              <div className="col-auto">
                <label htmlFor="fisrtName" className="visually-hidden">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fisrtName"
                  placeholder="First Name"
                  disabled="true"
                  value={data.firstName}
                  style={{
                    width: "300px",
                    height: "50px",
                    borderRadius: "0 0 0 0",
                    backgroundColor: "#fafafa"
                  }}
                />
              </div>
              <div className="col-auto">
                <label htmlFor="lastName" className="visually-hidden">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  disabled="true"
                  value={data.lastName}
                  style={{
                    width: "300px",
                    height: "50px",
                    borderRadius: "0 0 0 0",
                    backgroundColor: "#fafafa"
                  }}
                />
              </div>
            </form>
            <h6>
              Email Address <Link href="/" style={{textDecoration:"none"}} onClick={updateEmail}>Edit</Link>
            </h6>
            <form className="row my-4">
              <div className="col-auto">
                <label htmlFor="staticEmail2" className="visually-hidden">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="staticEmail2"
                  placeholder="Email Address"
                  disabled= {disableEmail}
                  value={data.email}
                  style={{
                    width: "300px",
                    height: "50px",
                    borderRadius: "0 0 0 0",
                    backgroundColor: "#fafafa"
                  }}
                />
              </div>
            </form>
            <h6>
              Mobile Number <a href="/" style={{textDecoration:"none"}}>Edit</a>
            </h6>
            <form className="row my-4">
              <div className="col-auto">
                <label htmlFor="mobileNumber" className="visually-hidden">
                  Mobile
                </label>
                <input
                  type="mobile"
                  className="form-control"
                  id="mobileNumber"
                  placeholder="Mobile Number"
                  disabled="true"
                  value={data.mobileNumber}
                  style={{
                    width: "300px",
                    height: "50px",
                    borderRadius: "0 0 0 0",
                    backgroundColor: "#fafafa"
                  }}
                />
              </div>
            </form>
            <h6>FAQs</h6>
            <p className="my-4" style={{fontWeight:500}}>
              What happens when I update my email address (or mobile number)?
            </p>
            <span>
              Your login email id (or mobile number) changes, likewise. You'll
              receive all your account related communication on your updated
              email address (or mobile number).
            </span>
            <p className="my-4" style={{fontWeight:500}}>
              When will my Flipkart account be updated with the new email
              address (or mobile number)?
            </p>
            <span>
              It happens as soon as you confirm the verification code sent to
              your email (or mobile) and save the changes.
            </span>
            <p className="my-4" style={{fontWeight:500}}>
              What happens to my existing Flipkart account when I update my
              email address (or mobile number)?
            </p>
            <span>
              Updating your email address (or mobile number) doesn't invalidate
              your account. Your account remains fully functional. You'll
              continue seeing your Order history, saved information and personal
              details.
            </span>
            <p className="my-4" style={{fontWeight:500}}>
              Does my Seller account get affected when I update my email
              address?
            </p>
            <span>
              Flipkart has a 'single sign-on' policy. Any changes will reflect
              in your Seller account also.
            </span> 
            <br/>
            <br/>
            <br/>    
            <a href="#" style={{textDecoration:"none"}}>Deactivate Account</a>
       
          </div>
          );
          })}
          
        </div>
      </div>
    </section>
  );
}

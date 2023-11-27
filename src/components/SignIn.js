import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import "./SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    const url = "https://localhost:7274/api/Account/UserLogin/users";
    axios
      .post(url, data)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully loged in!",
          showConfirmButton: false,
          timer: 1500,
        });
        //  alert(response.data.message);
        localStorage.setItem("email", data.email);
        localStorage.setItem("jwtToken", response.data.result);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: error,
        });
      });
  };

  return (
    <section style={{ backgroundColor: "#f1f3f6" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="my-5">
            {/* <div className="card-body p-0"> */}
            <div className="row">
              <div
                className="col-3"
                style={{
                  backgroundColor: "#2874f0",
                  width: "30%",
                  height: "500px",
                  marginTop: "-32px",
                  marginLeft: "147px",
                }}
              >
                <h1
                  className="mx-4 my-4"
                  style={{
                    color: "white",
                    fontSize: "28px",
                    fontFamily: "500",
                  }}
                >
                  Login
                </h1>
                <p
                  className="mx-3 my-4"
                  style={{ color: "#dbdbdb", fontSize: "18px" }}
                >
                  Get access to your Orders,
                  <br /> Wishlist and Recommendations
                </p>
                <img
                  src={
                    "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
                  }
                  style={{ marginTop: "165px", marginLeft: "50px" }}
                />
              </div>
              <div
                className="col-5"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,.08",
                  borderRadius: "0 0 0 0",
                  marginTop: "-32px",
                }}
              >
                <form className="user">
                  <div className="form-floating mb-3" style={{marginTop:"26px"}}>
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      onChange={(e) => handleEmailChange(e.target.value)}
                      style={{
                        borderBottom: "1 px solid black",
                        outline: "none",
                        marginLeft: "10px",
                        borderRight: 0,
                        borderLeft: 0,
                        borderTop: 0,
                        width: "417px",                        
                      }}
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput" className="text-muted" >Enter Email</label>
                  </div>

                  <div className="form-floating" style={{marginTop:"-26px"}}>
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      style={{
                        borderBottom: "1 px solid black",
                        outline: "none",
                        marginTop: "25px",
                        marginLeft: "10px",
                        borderRight: 0,
                        borderLeft: 0,
                        borderTop: 0,
                        width: "417px",
                      }}
                    />
                    <label htmlFor="floatingPassword" className="text-muted">Enter Password</label>
                  </div>
                  <span
                    style={{
                      color: "#878787",
                      fontSize: "12px",
                      fontWeight: "400",
                      marginLeft: "10px",
                    }}
                  >
                    By continuing, you agree to Flipkart's{" "}
                    <a herf="/" style={{ textDecoration: "none" }}>
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a href="/" style={{ textDecoration: "none" }}>
                      Privacy Policy
                    </a>
                    .
                  </span>
                  <button
                    type="submit"
                    className="btn btn-primary mb-1 my-2"
                    onClick={handleSignIn}
                    style={{
                      borderBottom: "0 0 0 0",
                      width: "417px",
                      backgroundColor: "#fb641b",
                      border: "none",
                      borderRadius: "0 0 0 0",
                      height: "50px",
                      marginLeft: "10px",
                    }}
                    block
                  >
                    <span style={{ fontWeight: 500 }}>LOGIN</span>
                  </button>
                  <div className="text-center">
                    <p
                      style={{
                        fontWeight: 500,
                        color: "#2874f0",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        marginTop: "230px",
                      }}
                    >
                      <Link to="/signup" style={{ textDecoration: "none" }}>
                        New to Anjumart? Create an account
                      </Link>
                    </p>
                    {/* <p>or sign up with:</p>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-facebook-f"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-google"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-twitter"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-github"></i>
    </button> */}
                  </div>
                </form>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

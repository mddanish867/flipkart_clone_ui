import React from 'react';
import { Link } from "react-router-dom";
import { useState, useRef } from 'react'  
import axios from 'axios'; 

export default function SignUp(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const  handleFirstNameChange = (value) =>{
        setFirstName(value)
       }
       const  handleLastNameChange = (value) =>{
        setLastName(value)
       }
       const  handleEmailChange = (value) =>{
        setEmail(value)
       }
       
       const  handleMobileNumberChange = (value) =>{
        setMobileNumber(value)
       }
       const  handlePasswordChange = (value) =>{
        setPassword(value)
       }
       const  handleConfirmPasswordChange = (value) =>{
        setConfirmPassword(value)
       }
       const handleCreate = () =>{
        const data= {
          FirstName:firstName,
          LastName:lastName,
          Email:email,
          Password:password,
          ConfirmPassword:confirmPassword,
          MobileNumber:mobileNumber,
          errormessage:""
      
        }
        const url = "https://localhost:7274/api/Account/CreateUser/Users";
        axios.post(url,data).then((result) =>{
          alert(result.data.message)  })
          .catch((error) =>{
          alert(error)
        })
       }
    
    
   
  
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
                  Looks like you're new here!
                </h1>
                <p
                  className="mx-3 my-4"
                  style={{ color: "#dbdbdb", fontSize: "18px" }}
                >
                  Sign up with your mobile number to get started
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
                  height:"500px"
                }}
              >
                <form className="user">
                  <div className="form-floating mb-3" style={{marginTop:"26px"}}>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      onChange={(e) => handleFirstNameChange(e.target.value)}
                      style={{
                        borderBottom: "2 px solid black",
                        outline: "none",
                        marginLeft: "10px",
                        borderRight: 0,
                        borderLeft: 0,
                        borderTop: 0,
                        width: "417px",                        
                      }}
                      placeholder="name@example.com"
                    />
                    <label htmlFor="firstName" className="text-muted" >Enter First Name</label>
                  </div>

                  <div className="form-floating" style={{marginTop:"-26px"}}>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last Name"
                      onChange={(e) => handleLastNameChange(e.target.value)}
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
                    <label htmlFor="lastName" className="text-muted">Enter Last Name</label>
                  </div>
                  <div className="form-floating" style={{marginTop:"-26px"}}>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      onChange={(e) => handleEmailChange(e.target.value)}
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
                    <label htmlFor="email" className="text-muted">Enter Email</label>
                  </div>
                  <div className="form-floating" style={{marginTop:"-26px"}}>
                    <input
                      type="mobile"
                      className="form-control"
                      id="mobileNumber"
                      placeholder="Password"
                      onChange={(e) => handleMobileNumberChange(e.target.value)}
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
                    <label htmlFor="mobileNumber" className="text-muted">Enter Mobile Number</label>
                  </div>
                  <div className="form-floating" style={{marginTop:"-26px"}}>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
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
                    <label htmlFor="password" className="text-muted">Enter Password</label>
                  </div>
                  <div className="form-floating" style={{marginTop:"-26px"}}>
                    <input
                      type="password"
                      className="form-control"
                      id="cpassword"
                      placeholder="Password"
                      onChange={(e) => handleConfirmPasswordChange(e.target.value)}
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
                    <label htmlFor="cpassword" className="text-muted">Enter Confirm Password</label>
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
                    onClick={(e) => handleCreate()}
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
                    <span style={{ fontWeight: 500 }}>CREATE ACCOUNT</span>
                  </button>
                  <div className="text-center">
                    <p
                      style={{
                        fontWeight: 500,
                        color: "#2874f0",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                    >
                      <Link to="/signin" style={{ textDecoration: "none" }}>
                      Already have account? Sign in
                      </Link>
                    </p>
                    
                  </div>
                </form>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  
     
    
 
  
  )
}

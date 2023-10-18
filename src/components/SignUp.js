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
    <div>
       
  
  
    <div className="container">  
        
      <div className="card o-hidden border-0 shadow-lg my-5" style={{ "marginTop": "5rem!important;" }}>  
        <div className="card-body p-0">  
          <div className="row">  
            <div className="col-lg-12">  
              <div className="p-5">  
                <div className="text-center">  
                  <h1 className="h4 text-gray-900 mb-4">Create a New User</h1>  
                </div>  
                <form  className="user">  
                  <div className="form-group row">  
                    <div className="col-sm-6 mb-3 mb-sm-0 my-2">  
                      <input type="text" name="FirstName" style={{ "border-color": "black" }}  onChange={(e) => handleFirstNameChange(e.target.value)} className="form-control" id="exampleFirstName" placeholder="Enter first name" />  
                    </div>  
                    <div className="col-sm-6 my-2">  
                      <input type="text" name="LastName" style={{ "border-color": "black" }}  onChange={(e) => handleLastNameChange(e.target.value)} className="form-control" id="exampleLastName" placeholder="Enter last name" />  
                    </div>  
                  </div>  
                  
                  <div className="form-group row">  
                    <div className="col-sm-6 mb-3 mb-sm-0 my-2">  
                      <input type="text" name="Email" style={{ "border-color": "black" }}  onChange={(e) => handleEmailChange(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter email" />  
                    </div>  
                    <div className="col-sm-6 my-2">  
                      <input type="mobile" name="MobileNumber" style={{ "border-color": "black" }}  onChange={(e) => handleMobileNumberChange(e.target.value)} className="form-control" id="exampleRepeatPassword" placeholder="Enter mobile number" />  
                    </div>  
                  </div> 

                  <div className="form-group row">  
                    <div className="col-sm-6 mb-3 mb-sm-0 my-2">  
                      <input type="password" name="Password" style={{ "border-color": "black" }}  onChange={(e) => handlePasswordChange(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter password" />  
                    </div>  
                    <div className="col-sm-6 my-2">  
                      <input type="password" name="ConfirmPassword" style={{ "border-color": "black" }}  onChange={(e) => handleConfirmPasswordChange(e.target.value)} className="form-control" id="exampleRepeatPassword" placeholder="Enter confirm password" />  
                    </div>  
                  </div>  
                  <button type="button" style={{ "border-radius": "0 0 0 0", "width":"365px" }}  className="btn btn-primary btn-block mb-4 my-4" onClick={(e) => handleCreate()}>Create account</button>
                  <div className="text-center">
    <p>Already have account? <Link to="/signin" style={{"text-decoration":"none"}}>Sign In</Link></p>
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
          </div>  
        </div>  
      </div>  
    </div>  
  )  
 
  
    </div>
  )
}

import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from 'react';
import Swal from 'sweetalert2';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const  handleEmailChange = (value) =>{
        setEmail(value)
       }

       const  handlePasswordChange = (value) =>{
        setPassword(value)
       }

       const handleSignIn = async (e) => {
         e.preventDefault();
         const data = { email: email, password: password };
         const url = "https://localhost:7274/api/Account/UserLogin/users";
         axios
           .post(url, data)
           .then((response) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Successfully loged in!',
              showConfirmButton: false,
              timer: 1500
            })
            //  alert(response.data.message);            
             localStorage.setItem("email",data.email);
             localStorage.setItem("jwtToken",response.data.result);
             navigate("/");
             window.location.reload();
           })
           .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: (error)
            })
           });
       };
      
    
    return (  
        
        <div className="container">  
        <div className="row justify-content-center">  
          <div className="col-xl-10 col-lg-12 col-md-9">  
            <div className="card o-hidden border-0 shadow-lg my-5">  
              <div className="card-body p-0">  
                <div className="row">  
                  <div className="col-lg-3 d-none d-lg-block bg-login-image" id="backGroundId" style={{"background-color":"#2874f0"}}>
                  <h1 className="mx-4 my-4" style={{"color":"white"}}>Login</h1>
<p className="mx-3 my-4" style={{color:"white"}}>Get access to your Orders, Wishlist and Recommendations</p></div>  
                  <div className="col-lg-4" style={{"width":"350px"}}>  
                    <div className="p-5" style={{"width":"350px"}}>  
                      <div className="text-left">  
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>  
                      </div>  
                      <form className="user">  
                        <div className="form-group my-2">  
                          <input type="email" className="form-control"  name="Email" onChange={(e) => handleEmailChange(e.target.value)}  style={{ "border-bottom": "1 px solid black",outline:"none","width":"355px" }} aria-describedby="emailHelp" placeholder="Enter email"/>  
                        </div>  
                        <div className="form-group my-2">  
                          <input type="password" className="form-control" name="Password" onChange={(e) => handlePasswordChange(e.target.value)} style={{ "border-bottom": "1 px solid black",outline:"none","width":"355px" }} placeholder="Enter password"/>  
                        </div>  
                        <div className="form-group my-2">  
                          <div className="custom-control custom-checkbox small">  
                            <input type="checkbox" className="custom-control-input" id="customCheck"/>  
                            <label className="custom-control-label" for="customCheck">Remember Me</label>  
                          </div>  
                        </div>  
                        <button type="submit" className="btn btn-primary mb-1 my-2" onClick={handleSignIn} style={{ "border-radius": "0 0 0 0", "width":"355px",backgroundColor:"#fb641b", border:"none" }} block><span>Login</span></button>    
                        <div className="text-center">
    <p>Not a member? <Link to="/signup" style={{"text-decoration":"none"}}>Register</Link></p>
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
          </div>  
        </div>  
    )  
}


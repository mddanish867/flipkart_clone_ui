import React, { useEffect } from 'react';
import   "../../components/Popups/ChangeAddressPopup.css";
import { cleanup } from '@testing-library/react';



const ChangeAddressPopup = ({closeModel}) => {
  useEffect(() =>{
    document.body.style.overflow = "hidden";
    return () =>{
      document.body.style.overflow = "scroll";
    };
  },[]);
    return (
      <>
      
      <div className="modal-dialog modal-container">
      <div className="modal-content">        
        <div className="modal-body" >
        <button
            type="button"
            onClick={closeModel}
            className="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
            style={{marginLeft:"276px"}}            
          ></button>
          <section className="h-100">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100" style={{border:"1px solid",backgroundColor:"#fff",width:"50%",height:"50%",marginLeft:"285px"}}>
                <div className="card-body p-md-5 text-black">
                <h5>Select Delivery address</h5>
                  <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                    <div className="form-check form-check-inline mb-0 me-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="femaleGender"                                               
                      />
                      <label
                        className="form-check-label"
                        htmlFor="femaleGender"
                      >
                        Azamgarh Upttar Pradesh
                      </label>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example97">
                      Enter pincode
                    </label>
                    <input
                      type="text"
                      id="form3Example97"
                      className="form-control form-control-lg"
                      style={{borderLeft:0,borderRight:0,borderTop:0,borderRadius:"0 0 0 0"}}
                    />
                  </div>

                  <div className="d-flex justify-content-end pt-3">
                    <button
                      type="button"
                      className="btn btn-warning btn-sm ms-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
      </>
      
    );
  };
  
  
  export default ChangeAddressPopup;
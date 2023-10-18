import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsHeart } from "react-icons/bs";
import { LiaSearchSolid } from "react-icons/lia";

export default function SearchResult({results}) {
 
  return (
    <div>
      <section id="sectionsId">
        <div className="container py-5">
          <div className="row">
            {results.map((data) => {
              return (
                <div className="col-md-12 col-lg-4 mb-4 mb-lg-0 my-2">
                  <div className="card">
                    <div className="d-flex justify-content-between p-3">
                      <p className="lead mb-0">Today's Combo Offer</p>
                      <div
                        className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                        id="rounded-circle"
                      >
                        <p className="text-white mb-0 small">
                          <BsHeart />
                        </p>
                      </div>
                    </div>
                    <img
                      src={data.productImageurl}
                      className="card-img-top"
                      alt="Laptop"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p className="small">
                          <a href="#!" className="text-muted">
                            {data.productName.slice(0, 15)}
                          </a>
                        </p>
                        <p className="small text-danger">
                          <s>&#8377; {data.productPrice}</s>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0">
                          {data.productDescription.slice(0, 20)}
                        </h5>
                        <h5 className="text-dark mb-0">
                          &#8377; {data.productDiscount}
                        </h5>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">
                          Available:{" "}
                          <span className="fw-bold">
                            {data.productQuanitity}
                          </span>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

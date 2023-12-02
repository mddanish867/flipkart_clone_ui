import React, { useEffect } from "react";

export default function PostQuestions({closeModel}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <>
      <div
        className="modal-dialog modal-container"
        style={{
          backgroundColor: "#7e7979",
          marginTop: "-180px",
          marginLeft: "-1246px",
          width: "1267px",
          height: "800px",
          opacity: "0.9",
        }}
      >
        <div className="modal-content">
          <div className="modal-body" style={{ marginTop: "35px" }}>
            <button
              type="button"
              onClick={closeModel}
              className="btn-close"
              data-mdb-dismiss="modal"
              aria-label="Close"
              style={{ marginLeft: "1090px" }}
            ></button>

            <div style={{ display: "flex" }}>
              <div
                className="col-3"
                style={{
                  marginLeft: "190px",
                  marginTop: "45px",
                  borderRight: "1px solid #f0f0f0",
                  backgroundColor: "#fafafa",
                  borderRadius:"3px",height:"370px",
                }}
              >
                <ul style={{ marginTop: "10px", marginLeft: "-12px" }}>
                  <li className="my-2">
                    Be Specifix, ask question only <br /> about the product
                  </li>
                  <li className="my-2">
                    Ensure you have gone through <br /> the product
                    specifications <br /> before posting your question.
                  </li>
                  <li className="my-2">
                    Reach out to Flipkart customer
                    <br /> care for queries related
                    <br /> to offers, orders, delivery <br /> etc.
                  </li>
                </ul>
              </div>

              <div
                className="col-9"
                style={{
                  marginLeft: "-15px",
                  marginTop: "45px",
                  backgroundColor: "#fff",
                  width: "556px",
                  height:"370px",
                  borderRadius:"3px"
                }}
              >
                <div className="form-group">
                  <h6
                    className="form-label"
                    htmlFor="form3Example97"
                    style={{ marginTop: "15px" }}
                  >
                    Post your question
                  </h6>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Type your question here.."
                    style={{
                      height: "230px",
                      marginTop: "25px",
                      borderRadius: "0 0 0 0",
                      borderLeft: 0,
                      borderRight: 0,
                      borderRadius: 0,
                      width: "540px",
                    }}
                  ></textarea>
                </div>
                <div style={{ display: "flex" }}>
                  <button
                    style={{
                      boxShadow: "0 1px 2px 0 rgba(0,0,0,.26)",
                      border: "none",
                      color: "#212121",
                      fontSize: "14px",
                      width: "200px",
                      padding: "14px 0",
                      backgroundColor: "#fb641b",
                      cursor: "pointer",
                      textTransform: "capitalize",
                      fontWeight: 500,
                      marginLeft: "320px",
                      color:"#fff",
                      borderRadius:"2px",
                      height:"48px"
                    }}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

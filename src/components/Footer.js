import React from "react";
import "./Footer.css";
import { RiVisaLine, RiMastercardFill, RiPaypalFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div>
      <footer
        className="text-center text-lg-start text-muted bg-dark mt-3"
        id="Footer"
      >
        {/* <!-- Section: Links  --> */}
        <section id="Footer">
          <div className="container text-center text-md-start pt-4 pb-4">
            {/* <!-- Grid row --> */}
            <div className="row mt-3">
              {/* <!-- Grid column --> */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Store
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="/">
                      About us
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Find store
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Information
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="/">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Money refund
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Shipping info
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Refunds
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Support
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="/">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Documents
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Account restore
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      My orders
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Information
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="/">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Money refund
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Shipping info
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Refunds
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- Grid column --> */}
              {/* <!-- Grid column --> */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Support
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="/">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Documents
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Account restore
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      My orders
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Information
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white-50" href="/">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Money refund
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Shipping info
                    </a>
                  </li>
                  <li>
                    <a className="text-white-50" href="/">
                      Refunds
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}

        <div style={{ backgroundColor: "#172337", height: "80px" }}>
          <div className="container">
            <div className="d-flex justify-content-between border-top">
              <p className="mt-1 text-white">© 2023 Copyright: Anjumart.com</p>
              {/* <!--- payment ---> */}
              <div style={{ marginTop: "10px" }}>
                <RiVisaLine
                  style={{
                    backgroundColor: "#fff",
                    height: "25px",
                    width: "50px",
                  }}
                />
                <RiMastercardFill
                  className="mx-1"
                  style={{
                    backgroundColor: "#fff",
                    height: "25px",
                    width: "50px",
                  }}
                />
                <RiPaypalFill
                  className="mx-1"
                  style={{
                    backgroundColor: "#fff",
                    height: "25px",
                    width: "50px",
                  }}
                />
              </div>

              {/* <!--- payment ---> */}

              {/* <!--- language selector ---> */}
              <div className="dropdown dropup">
                <a
                  className="dropdown-toggle text-white"
                  href="/"
                  id="Dropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  <i className="flag-united-kingdom flag m-0 me-1"></i>English{" "}
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="Dropdown"
                >
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-united-kingdom flag"></i>English{" "}
                      <i className="fa fa-check text-success ms-2"></i>
                    </a>
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <hr className="dropdown-divider" />
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-poland flag"></i>Polski
                    </a>
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-china flag"></i>中文
                    </a>
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-japan flag"></i>日本語
                    </a>
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-germany flag"></i>Deutsch
                    </a>
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-france flag"></i>Français
                    </a>
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-spain flag"></i>Español
                    </a>
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-russia flag"></i>Русский
                    </a>
                  </li>
                  <li style={{ color: "#2874f0" }}>
                    <a className="dropdown-item" href="/">
                      <i className="flag-portugal flag"></i>Português
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

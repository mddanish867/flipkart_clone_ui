import React from "react";

export default function ForgotPassword() {
  return (
    <div className="container my-2 justify-content-center">
        <h1>Retrieve password</h1>
        <p>Please enter the login ID of the account to retrieve your password</p>
      <form>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="lblEmail"
            className="form-control"
            placeholder="Enter email address"
          />
        </div>
        {/* <!-- Submit button --> */}
        <button
          type="button"
          id="logibBtn"
          className="btn btn-primary btn-block mb-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

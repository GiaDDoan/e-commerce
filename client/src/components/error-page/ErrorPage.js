import React from "react";
import "./ErrorPage.css";
import { MdError } from "react-icons/md";

const ErrorPage = ({ errorMsg }) => {
  const msg = errorMsg ? errorMsg : "Page Currently Unavailable";

  return (
    <div className="error-container">
      <MdError className="error-icon" />
      <div className="error-text">{msg}</div>
    </div>
  );
};

export default ErrorPage;

import React from "react";
import "./ConfirmationPage.css";
import { BsFillCartCheckFill } from "react-icons/bs";

const ConfirmationPage = ({ confirmationName }) => {
  console.log("as", confirmationName);
  const confirmationNumber = Date.now();

  return (
    <div className="confirm-wrapper">
      <div className="confirm-ty">
        Thank You {confirmationName} for ordering!
      </div>
      <div className="confirm-number">
        Your confirmation number is: {confirmationNumber}
      </div>
    </div>
  );
};

export default ConfirmationPage;

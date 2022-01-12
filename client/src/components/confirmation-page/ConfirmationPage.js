import React from "react";
import "./ConfirmationPage.css";
import { BsFillCartCheckFill } from "react-icons/bs";

const ConfirmationPage = ({ confirmationName }) => {
  console.log("as", confirmationName);
  const confirmationNumber = Date.now();
  // confirmationName = "da";

  return (
    <div className="confirm-wrapper">
      <div className="confirm-ty">
        <div className="confirm-logo-wrapper">
          <BsFillCartCheckFill className="confirm-logo" />
        </div>
        <div className="confirm-note">
          Thank you {confirmationName} for placing an ordering!
        </div>
      </div>
      <div className="confirm-number">
        <h4>Confirmation Number:</h4>
        <div>{confirmationNumber}</div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

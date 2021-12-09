import React from "react";
import "./Typehead.css";
import SearchIcon from "@material-ui/icons/Search";

const Typehead = () => {
  return (
    <div className="typehead-container">
      <input className="typehead-input" type="text" />
      <SearchIcon className="typehead-icon" />
    </div>
  );
};

export default Typehead;

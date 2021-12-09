import React, { useState, useEffect } from "react";
import "./Typehead.css";
import SearchIcon from "@material-ui/icons/Search";

const Typehead = () => {
  const [searchInput, setSearchInput] = useState({
    searchValue: "",
  });

  useEffect(() => {
    console.log(searchInput);
    //API call for Typehead, MAKE THE CALL IN BE
  }, [searchInput]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchInput({
      ...searchInput,
      [name]: value,
    });
  };

  return (
    <div className="typehead-container">
      <input
        className="typehead-input"
        type="text"
        name="searchValue"
        onChange={handleSearchChange}
      />
      <SearchIcon className="typehead-icon" />
    </div>
  );
};

export default Typehead;

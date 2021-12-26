import React, { useState, useEffect } from "react";
import "./Typehead.css";
import SearchIcon from "@material-ui/icons/Search";
import { fetchSearch } from "../../api-helpers/search-helper";

const Typehead = () => {
  const [searchInput, setSearchInput] = useState({
    searchValue: "",
  });
  const [status, setStatus] = useState("loading");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getSearch = async () => {
      const res = await fetchSearch(searchInput.searchValue);

      setStatus("loading");
      if (res.status === 200) {
        console.log("SEARCH RES", res);
        setSearchResults(res.searchArray);
        setStatus("idle");
      } else {
        console.log("ERR", res.message);
        setStatus("error");
      }
    };
    getSearch();
  }, [searchInput]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchInput({
      ...searchInput,
      [name]: value,
    });
  };

  //ADD BOX UNDER SEARCH BAR

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

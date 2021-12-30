import React, { useState, useEffect, useRef } from "react";
import "./Typehead.css";
import SearchIcon from "@material-ui/icons/Search";
import { fetchSearch } from "../../api-helpers/search-helper";

const Typehead = () => {
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const getSearch = async () => {
      const res = await fetchSearch(search);

      setStatus("loading");
      if (res.status === 200) {
        setOptions(res.searchArray);
        setStatus("idle");
      } else {
        console.log("ERR", res.message);
        setStatus("error");
      }
    };
    getSearch();
  }, [search]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const setSearchInputValue = (value) => {
    setSearch(value);
    setDisplay(false);
  };

  console.log("OP", options.length, display);

  //ADD BOX UNDER SEARCH BAR
  return (
    <div ref={wrapperRef} className="typehead-container">
      <input
        className="typehead-input"
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onClick={() => setDisplay(!display)}
      />
      <SearchIcon className="typehead-icon" />

      {display && search.length > 0 && (
        <div>
          {options.map((value, i) => {
            return (
              <div
                className="typehead-option"
                key={i}
                onClick={() => setSearchInputValue(value.name)}
                tabIndex="0"
              >
                <span>{value.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Typehead;

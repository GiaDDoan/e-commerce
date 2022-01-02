import React, { useState, useEffect, useRef } from "react";
import "./Typehead.css";
import { FiSearch } from "react-icons/fi";
import { fetchSearch } from "../../api-helpers/search-helper";

const Typehead = () => {
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(Boolean);
  const [options, setOptions] = useState([]);
  const wrapperRef = useRef(null);
  const onFocus = () => setDisplay(true);
  const onBlur = () => setDisplay(false);

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
    // console.log("click outside", wrapperRef, event.target);
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const setSearchInputValue = (value) => {
    setSearch(value);
    setDisplay(false);
    //Add history.push to the value
  };

  return (
    <div ref={wrapperRef} className="typehead-container">
      <div className="typehead-input-wrapper">
        <input
          className="typehead-input"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onFocus={onFocus}
          // onBlur={onBlur}
        />
        <div className="typehead-icon-wrapper">
          <FiSearch className="typehead-icon" />
        </div>
      </div>

      {display && (
        <ul className="typehead-suggestions">
          {options.map((value, i) => {
            return (
              <li
                className="typehead-option"
                key={value._id}
                onClick={() => setSearchInputValue(value.name)}
                tabIndex="0"
              >
                <span>{value.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Typehead;

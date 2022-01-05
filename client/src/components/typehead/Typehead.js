import React, { useState, useEffect, useRef } from "react";
import "./Typehead.css";
import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { fetchSearch } from "../../api-helpers/search-helper";

const Typehead = () => {
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(Boolean);
  const [options, setOptions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = React.useState(-1);
  const history = useHistory();
  const wrapperRef = useRef(null);
  const onFocus = () => setDisplay(true);
  // const onBlur = () => setDisplay(false);

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

  const handleSearch = (searchValue) => {
    console.log("handling search", searchValue);
    // history.push(`/search/${searchValue}/1`);
  };

  const setSearchInputValue = (value) => {
    const { name, _id } = value;

    setSearch(name);
    setDisplay(false);
    console.log("handling id", name);
    // history.push(`/product/${_id}`);
  };
  console.log("sug", suggestionIndex);

  return (
    <div ref={wrapperRef} className="typehead-container">
      <div className="typehead-input-wrapper">
        <input
          className="typehead-input"
          type="text"
          value={search}
          onFocus={onFocus}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter": {
                if (suggestionIndex === -1) {
                  handleSearch(search);
                } else {
                  setSearchInputValue(options[suggestionIndex]);
                }
                setDisplay(false);
                break;
              }
              case "ArrowUp": {
                if (suggestionIndex > -1) {
                  setSuggestionIndex(suggestionIndex - 1);
                }
                break;
              }
              case "ArrowDown": {
                if (options.length - 1 > suggestionIndex) {
                  setSuggestionIndex(suggestionIndex + 1);
                }
                break;
              }
              default:
                return;
            }
          }}
          // onBlur={onBlur}
        />
        <div className="typehead-icon-wrapper">
          <FiSearch
            className="typehead-icon"
            onClick={() => handleSearch(search)}
          />
        </div>
      </div>

      {display && (
        <ul className="typehead-suggestions">
          {options.map((value, i) => {
            return (
              <li
                className="typehead-option"
                key={value._id}
                onClick={() => setSearchInputValue(value)}
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

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

    if (search.length > 0) {
      let timerFunc = setTimeout(() => {
        getSearch();
      }, 500);

      return () => clearTimeout(timerFunc);
    } else {
      //MIGHT HAVE TO ADD STATUS
      setOptions([]);
    }
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
    history.push(`/search/${searchValue}/1`);
  };

  const setSearchInputValue = (value) => {
    const { name, _id } = value;

    setSearch(name);
    setDisplay(false);
    history.push(`/product/${_id}`);
  };

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
          {options.map((option, i) => {
            const slicedIndex = option.name
              .toLowerCase()
              .indexOf(search.toLowerCase());

            const firstPart = option.name.slice(0, slicedIndex + search.length);

            const offPart = option.name.slice(0, slicedIndex);
            const offPartWritten = option.name.slice(
              slicedIndex,
              slicedIndex + search.length
            );

            const secondPart = option.name.slice(slicedIndex + search.length);

            const isSelected =
              options.indexOf(option) === suggestionIndex ? true : false;

            return (
              <li
                className="typehead-option"
                key={option._id}
                onClick={() => setSearchInputValue(option)}
                tabIndex="0"
                style={{
                  background: isSelected
                    ? "hsla(50deg, 100%, 80%, 0.25)"
                    : "transparent",
                }}
              >
                {slicedIndex === 0 ? (
                  <span className="highlith-part">{firstPart}</span>
                ) : (
                  <>
                    <span>{offPart}</span>
                    <span className="highlith-part">{offPartWritten}</span>
                  </>
                )}
                <span>{secondPart}</span>

                {/* <span>{option.name}</span> */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Typehead;

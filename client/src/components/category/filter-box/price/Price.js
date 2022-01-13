import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Price.css";
import {
  requestInitialPrices,
  receivePrices,
  toggleCheckbox,
} from "../../../../store/reducers/filters/actions";

function Price({ filter, setFilter, status }) {
  // const TEST = [...initialCheckboxes];
  // const [checkboxes, setCheckboxes] = useState(TEST);
  const items = useSelector((state) => state.items);
  const [selectedSort, setSelectedSort] = useState("");
  const pricesState = useSelector((state) => state.prices);
  const [isChecked, setIsChecked] = useState("");
  const { categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  let priceCheckboxes = [
    {
      price: "Under $25",
      min: 0,
      max: 25,
      checked: false,
      id: "checkboxOne",
    },
    {
      price: "$25 to $50",
      min: 25,
      max: 50,
      checked: false,
      id: "checkboxTwo",
    },
    {
      price: "$50 & Above",
      min: 50,
      max: null,
      checked: false,
      id: "checkboxThree",
    },
  ];

  useEffect(() => {
    dispatch(requestInitialPrices());
  }, [categoryName]);

  const handleCheckbox = (event, checkbox) => {
    // event.target.checked ? setIsChecked(id) : setIsChecked('');
    const { id, min, max } = checkbox;

    if (event.target.checked) {
      setIsChecked(id);
      setFilter({
        ...filter,
        min: min,
        max: max,
      });
    } else {
      setIsChecked("");
    }
  };

  const handleChange = (event) => {
    setFilter({
      ...filter,
      sort: event.target.value,
    });
  };

  // if (status === 'loading') {
  //   return <div>Filtering</div>;
  // }

  return (
    <Wrapper className="price-wrapper">
      <div className="filter-header">Price</div>
      <div className="price__container">
        <ul className="price-wrapper">
          {priceCheckboxes.map((checkbox, i) => {
            // console.log('CHECK', checkbox);
            return (
              <li>
                <input
                  type="checkbox"
                  checked={isChecked === checkbox.id ? true : false}
                  id={`${checkbox.id}`}
                  value={checkbox.price}
                  onChange={(e) => handleCheckbox(e, checkbox)}
                  key={i}
                  // onChange={(e) => {
                  //   console.log('CHECK'.e.target.checked);
                  //   dispatch(toggleCheckbox(i));
                  //   setFilter({
                  //     ...filter,
                  //     min: checkbox.min,
                  //     max: checkbox.max,
                  //   });
                  // }}
                />
                <label for={checkbox.id} key={`${checkbox.price}`}>
                  {checkbox.price}
                </label>
              </li>

              // <label key={`${checkbox.price}`}>
              //   <input
              //     type="checkbox"
              //     checked={checkbox.checked}
              //     // onChange={(e) => onChecked(e, i)}
              //     onChange={(e) => {
              //       dispatch(toggleCheckbox(i));
              //       setFilter({
              //         ...filter,
              //         min: pricesState.prices[i].min,
              //         max: pricesState.prices[i].max,
              //       });
              //     }}
              //   />
              //   {checkbox.price}
              // </label>
            );
          })}
        </ul>
        <div className="select-wrapper">
          <select className="select" onChange={handleChange}>
            <option value="">Sort by: Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* .price__container {
    display: flex;
    flex-direction: column;
    width: 100%;
  } */
  input {
    vertical-align: middle;
    position: relative;
    bottom: 1px;
  }
  label {
    display: block;
  }
`;

export default Price;

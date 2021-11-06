import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  requestInitialPrices,
  receivePrices,
  toggleCheckbox,
} from '../../../../store/reducers/filters/actions';

function Price({ filter, setFilter }) {
  // const TEST = [...initialCheckboxes];
  // const [checkboxes, setCheckboxes] = useState(TEST);
  const items = useSelector((state) => state.items);
  const [selectedSort, setSelectedSort] = useState('');
  const pricesState = useSelector((state) => state.prices);
  const { categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestInitialPrices());
  }, [categoryName]);

  const handleChange = (event) => {
    console.log('changing', typeof event.target.value);
    setFilter({
      ...filter,
      sort: event.target.value,
    });
  };

  if (items.status === 'loading') {
    return <div>Filtering</div>;
  }
  if (items.status === 'idle' || pricesState.status === 'idle') {
    return (
      <Wrapper className="price">
        <h3>Price</h3>
        <div className="price__container">
          {pricesState.prices.map((checkbox, i) => {
            return (
              <label key={`${checkbox.price}`}>
                <input
                  type="checkbox"
                  checked={checkbox.checked}
                  // onChange={(e) => onChecked(e, i)}
                  onChange={(e) => {
                    dispatch(toggleCheckbox(i));
                    setFilter({
                      ...filter,
                      min: pricesState.prices[i].min,
                      max: pricesState.prices[i].max,
                    });
                  }}
                />
                {checkbox.price}
              </label>
            );
          })}
          <select onChange={handleChange}>
            <option value="">Sort by: Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </Wrapper>
    );
  }
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

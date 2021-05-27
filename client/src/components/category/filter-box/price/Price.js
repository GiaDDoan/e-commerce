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
  const pricesState = useSelector((state) => state.prices);
  const { categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestInitialPrices());
  }, [categoryName]);
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
              <label>
                <input
                  key={i}
                  type="checkbox"
                  checked={checkbox.checked}
                  // onChange={(e) => onChecked(e, i)}
                  onChange={(e) => {
                    dispatch(toggleCheckbox(i));
                    console.log('STATE', pricesState.prices[i]);
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
          <select>
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
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

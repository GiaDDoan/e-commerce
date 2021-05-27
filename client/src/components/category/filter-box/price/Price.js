import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  requestInitialPrices,
  toggleCheckbox,
} from '../../../../store/reducers/filters/actions';

const initialCheckboxes = [
  {
    price: 'under $25',
    min: 0,
    max: 25,
    checked: false,
  },
  {
    price: '$25 to $50',
    min: 25,
    max: 50,
    checked: false,
  },
  {
    price: '$50 & Above',
    min: 50,
    max: 200,
    checked: false,
  },
];

function Price({}) {
  const TEST = [...initialCheckboxes];
  const [checkboxes, setCheckboxes] = useState(TEST);
  const items = useSelector((state) => state.items);
  const pricesState = useSelector((state) => state.prices);
  const { categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('effect activated');
    dispatch(requestInitialPrices());
    setCheckboxes(initialCheckboxes);
  }, [categoryName]);

  const onChecked = (e, changedIndex) => {
    const updatedCheckboxes = [...checkboxes];
    // console.log('updatedCheckboxes', updatedCheckboxes);
    if (updatedCheckboxes[changedIndex].checked === false) {
      for (let i = 0; i < updatedCheckboxes.length; i++) {
        // console.log('in for loop');
        if (updatedCheckboxes[i].checked === true)
          updatedCheckboxes[i].checked = false;
      }
    }

    updatedCheckboxes[changedIndex].checked = updatedCheckboxes[changedIndex]
      .checked
      ? false
      : true;
    setCheckboxes(updatedCheckboxes);
    if (updatedCheckboxes[changedIndex].checked === true) {
      history.push(
        `/filter/${categoryName}/${updatedCheckboxes[changedIndex].price
          .replaceAll('$', '')
          .split(' ')
          .join('')}/${updatedCheckboxes[changedIndex].min}/${
          updatedCheckboxes[changedIndex].max
        }/1`
      );
    }
    if (updatedCheckboxes[changedIndex].checked === false) {
      history.push(`/category/${categoryName}/1`);
    }
  };

  if (items.status === 'loading') {
    return <div>Filtering</div>;
  }
  if (items.status === 'idle' && pricesState.status === 'idle') {
    // console.log('items', items);
    // console.log('initialCheckboxes', initialCheckboxes);
    // console.log('prices', pricesState);

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

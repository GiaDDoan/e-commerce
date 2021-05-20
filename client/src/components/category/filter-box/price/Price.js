import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const initialCheckboxes = [
  {
    price: 'under $25',
    checked: false,
  },
  {
    price: '$25 to $50',
    checked: false,
  },
  {
    price: '$50 & Above',
    checked: false,
  },
];

function Price() {
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const items = useSelector((state) => state.items);
  const { categoryName, page } = useParams();

  const onChecked = (e, changedIndex) => {
    let updatedCheckboxes = [...checkboxes];
    if (updatedCheckboxes[changedIndex].checked === false) {
      for (let i = 0; i < updatedCheckboxes.length; i++) {
        console.log('in for loop');
        if (updatedCheckboxes[i].checked === true)
          updatedCheckboxes[i].checked = false;
      }
    }

    updatedCheckboxes[changedIndex].checked = updatedCheckboxes[changedIndex]
      .checked
      ? false
      : true;

    setCheckboxes(updatedCheckboxes);
  };

  if (items.status === 'loading') {
    return <div>Filtering</div>;
  }
  if (items.status === 'idle') {
    // console.log('items', items);

    return (
      <Wrapper className="price">
        <h3>Price</h3>
        <div className="price__container">
          {checkboxes.map((checkbox, i) => {
            return (
              <label>
                <input
                  key={i}
                  type="checkbox"
                  checked={checkbox.checked}
                  onChange={(e) => onChecked(e, i)}
                />
                {checkbox.price}
              </label>
            );
          })}
          {/* <label>
            <input type="checkbox" />
            under $25
          </label>
          <label>
            <input type="checkbox" />
            $25 to $50
          </label>
          <label>
            <input type="checkbox" />
            {`$50 & Above`}
          </label> */}
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

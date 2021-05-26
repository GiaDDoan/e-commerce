import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Price({ prices }) {
  const items = useSelector((state) => state.items);
  const { categoryName, page } = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log('effect activated');
    setCheckboxes(initialCheckboxes);
  }, [categoryName]);

  const onChecked = (e, changedIndex) => {
    const updatedCheckboxes = [...checkboxes];
    console.log('updatedCheckboxes', updatedCheckboxes);
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
      // console.log('CHECK', updatedCheckboxes[changedIndex]);
      // history.push(
      //   `/category/${categoryName}/${updatedCheckboxes[changedIndex].price
      //     .replaceAll('$', '')
      //     .split(' ')
      //     .join('')}?min=${updatedCheckboxes[changedIndex].min}&max=${
      //     updatedCheckboxes[changedIndex].max
      //   }&page=1`
      // );
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
  if (items.status === 'idle') {
    // console.log('items', items);
    console.log('initialCheckboxes', initialCheckboxes);

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

import React from 'react';
import styled from 'styled-components';

function Price() {
  return (
    <Wrapper className="price">
      <h3>Price</h3>
      <div className="price__container">
        <label>
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
        </label>
        <select>
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
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

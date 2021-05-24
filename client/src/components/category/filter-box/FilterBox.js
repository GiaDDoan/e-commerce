import React from 'react';
import styled from 'styled-components';
import './FilterBox.css';

import Price from './price/Price';

function FilterBox() {
  return (
    <Wrapper className="filter__box">
      <Price />
      <Submit>Submit</Submit>
    </Wrapper>
  );
}

const Wrapper = styled.form``;
const Submit = styled.button``;

export default FilterBox;

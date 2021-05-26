import React, { useState } from 'react';
import styled from 'styled-components';
import './FilterBox.css';

import Price from './price/Price';
import Companies from './companies/Companies';

function FilterBox() {
  return (
    <Wrapper className="filter__box">
      <Price />
      <Companies />
      <Submit>Submit</Submit>
    </Wrapper>
  );
}

const Wrapper = styled.form``;
const Submit = styled.button``;

export default FilterBox;

import React from 'react';
import styled from 'styled-components';
import './FilterBox.css';

import Price from './price/Price';

function FilterBox() {
  return (
    <Wrapper className="filter__box">
      <Price />
    </Wrapper>
  );
}

const Wrapper = styled.form``;

export default FilterBox;

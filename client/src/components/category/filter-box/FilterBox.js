import React, { useState } from 'react';
import styled from 'styled-components';
import './FilterBox.css';

import Price from './price/Price';
import Companies from './companies/Companies';
import Submit from './submit/Submit';

function FilterBox({ filter, setFilter }) {
  return (
    <Wrapper className="filter__box">
      <Price filter={filter} setFilter={setFilter} />
      <Companies filter={filter} setFilter={setFilter} />
      <Submit filter={filter} setFilter={setFilter} />
    </Wrapper>
  );
}

const Wrapper = styled.form``;

export default FilterBox;

import React, { useState } from 'react';
import styled from 'styled-components';
import './FilterBox.css';

import Price from './price/Price';
import Companies from './companies/Companies';

const initialFilter = {
  price: [
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
  ],
};

function FilterBox() {
  const [filter, setFilter] = useState('');

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

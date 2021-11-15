import React, { useState } from 'react';
import './FilterBox.css';

import Price from './price/Price';
import Companies from './companies/Companies';
import Submit from './submit/Submit';

function FilterBox({ filter, setFilter, companies }) {
  return (
    <div className="filter__box">
      <Price filter={filter} setFilter={setFilter} />
      <Companies filter={filter} setFilter={setFilter} companies={companies} />
      <Submit filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default FilterBox;

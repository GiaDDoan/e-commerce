import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestInitialPrices,
  receivePrices,
  toggleCheckbox,
} from '../../../../store/reducers/filters/actions';

function Submit({ filter, setFilter }) {
  const prices = useSelector((state) => state.prices);
  //Go in Redux store to get submit data
  console.log('filter', prices);

  return (
    <Wrapper>
      <button>Submit</button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Submit;

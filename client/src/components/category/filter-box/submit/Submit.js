import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestInitialPrices,
  receivePrices,
  toggleCheckbox,
} from '../../../../store/reducers/filters/actions';
import { useHistory } from 'react-router-dom';

function Submit({ filter, setFilter }) {
  const prices = useSelector((state) => state.prices);
  const history = useHistory();
  //Go in Redux store to get submit data
  const submitFilter = (filterId) => {
    history.push(`/filter/${filterId}/1`);
  };

  return (
    <Wrapper>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          console.log('FILTER', filter);
        }}
      >
        Submit
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Submit;

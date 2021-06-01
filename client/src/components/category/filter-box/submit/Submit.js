import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestInitialPrices,
  receivePrices,
  toggleCheckbox,
} from '../../../../store/reducers/filters/actions';
import {
  requestFilteredItems,
  receiveFilteredItems,
  sendError,
} from '../../../../store/reducers/filtered-items/actions';
import { v4 as uuid_v4 } from 'uuid';
import { useHistory } from 'react-router-dom';

function Submit({ filter, setFilter }) {
  const prices = useSelector((state) => state.prices);
  const filteredItems = useSelector((state) => state.filteredItems);
  const history = useHistory();
  const dispatch = useDispatch();
  //Go in Redux store to get submit data
  const submitFilter = (filterId) => {
    // history.push(`/filter/${filterId}/1`);
    fetch(`/items/filter/${filterId}`, {
      method: 'POST',
      body: JSON.stringify({ ...filter }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(requestFilteredItems());
        if (json.status === 200) {
          console.log('in IF', json.items);
          dispatch(receiveFilteredItems(filterId, json.items));
        } else {
          dispatch(sendError());
        }
      });
  };

  return (
    <Wrapper>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          submitFilter(uuid_v4());
        }}
      >
        Submit
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Submit;

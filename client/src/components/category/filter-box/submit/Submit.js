import React, { useEffect } from 'react';
import './Submit.css';
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
import { fetchProductsByFilter } from '../../../../api-helpers/index';
import { v4 as uuid_v4 } from 'uuid';
import { useHistory } from 'react-router-dom';

function Submit({ filter, setFilter }) {
  const prices = useSelector((state) => state.prices);
  const filteredItems = useSelector((state) => state.filteredItems);
  const history = useHistory();
  const dispatch = useDispatch();

  //Go in Redux store to get submit data
  const submitFilter = async (filterId) => {
    history.push(`/filter/${filterId}/1`);
    dispatch(requestFilteredItems());
    const result = await fetchProductsByFilter(filter, '1');
    if (result.status === 200) {
      dispatch(receiveFilteredItems(filterId, result.results, '1', filter));
    } else {
      dispatch(sendError());
    }
  };

  return (
    <div className="submit-wrapper">
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          submitFilter(uuid_v4());
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Submit;

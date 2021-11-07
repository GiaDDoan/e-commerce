import React, { useEffect } from 'react';
import './FilteredCategory.css';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../product/Product';
import Pagination from '../pagination/Pagination';
import FilterSendToNewPage from '../../function-helpers/FilterSendToNewPage';
import { useHistory } from 'react-router-dom';
import { fetchProductsByFilter } from '../../api-helpers/index';
import {
  requestFilteredItems,
  receiveFilteredItems,
  sendError,
} from '../../store/reducers/filtered-items/actions';

function FilteredCategory() {
  const { filterId, page } = useParams();
  const filteredItems = useSelector((state) => state.filteredItems);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page === '1') return;
    if (filteredItems[filterId + '_' + page]) return;
    dispatch(requestFilteredItems());
    const filteringItems = async () => {
      const result = await fetchProductsByFilter(
        filteredItems[filterId + '_' + '1'].filter,
        page
      );
      if (result.status === 200) {
        dispatch(
          receiveFilteredItems(
            filterId,
            result.results,
            page,
            filteredItems[filterId + '_' + '1'].filter
          )
        );
      } else {
        dispatch(sendError());
      }
    };
    filteringItems();
  }, [page]);

  if (filteredItems.status === 'loading') {
    return <div>Filtering items</div>;
  }
  if (filteredItems.status === 'idle' && filteredItems[filterId + '_' + page]) {
    return (
      <Wrapper className="category__filtered">
        <div className="category__filtered__items">
          {filteredItems[filterId + '_' + page].items.results.map((item, i) => {
            let rating = Math.random() * 1 + 4;

            return (
              <Product
                name="category"
                id={item._id}
                title={item.name}
                price={item.price}
                image={item.imageSrc}
                rating={rating}
                stock={item.numInStock}
                key={i}
              />
            );
          })}
        </div>

        <Pagination
          option="filter"
          items={filteredItems}
          categoryName={filterId}
          page={page}
        />
      </Wrapper>
    );
  } else {
    return <div>test</div>;
  }
}

const Wrapper = styled.div``;

export default FilteredCategory;

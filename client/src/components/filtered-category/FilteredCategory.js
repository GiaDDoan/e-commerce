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
            let checkedTitle = item.name;

            if (item.name.length > 60) {
              let splitting = item.name.split(' ');
              let totalLength = 0;

              for (var x = 0; x < splitting.length; x++) {
                if (totalLength >= 50) {
                  checkedTitle = splitting.slice(0, x).join(' ').concat('...');
                  break;
                }
                totalLength += splitting[x].length;
              }
            }

            return (
              <Product
                name="category"
                id={item._id}
                title={checkedTitle}
                price={item.price}
                image={item.imageSrc}
                rating={item.rating}
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

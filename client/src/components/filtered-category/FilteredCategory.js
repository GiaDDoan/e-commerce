import React, { useEffect } from 'react';
import '../category/Category.css';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../product/Product';
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
    console.log('fil', page);
    if (page === '1') return;
    if (filteredItems[filterId + '_' + page]) return;
    dispatch(requestFilteredItems());
    const filteringItems = async () => {
      const result = await fetchProductsByFilter(
        filteredItems[filterId + '_' + '1'].filter,
        page
      );
      console.log('res', result);
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
              <ProductContainer key={item._id} className="category__container">
                <Product
                  name="category"
                  id={item._id}
                  title={item.name}
                  price={item.price}
                  image={item.imageSrc}
                  rating={rating}
                  key={i}
                />
              </ProductContainer>
            );
          })}
        </div>
        <Pagination className="pagination">
          {filteredItems[filterId + '_' + page].items.previous ? (
            <button
              onClick={() =>
                FilterSendToNewPage(
                  history,
                  filterId,
                  filteredItems[filterId + '_' + page].items.previous.page
                )
              }
            >
              Prev
            </button>
          ) : null}
          <div className="pagination__initial">{page}</div>
          {filteredItems[filterId + '_' + page].items.next ? (
            <button
              onClick={() =>
                FilterSendToNewPage(
                  history,
                  filterId,
                  filteredItems[filterId + '_' + page].items.next.page
                )
              }
            >
              Next
            </button>
          ) : null}
        </Pagination>
      </Wrapper>
    );
  } else {
    return <div>test</div>;
  }
}

const Wrapper = styled.div``;
const ProductContainer = styled.div``;
const Pagination = styled.div``;

export default FilteredCategory;

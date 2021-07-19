import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Category.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import FilterBox from './filter-box/FilterBox';
import Product from '../product/Product';
import { fetchItemsByCategory } from '../../api-helpers/index';
import SendToPage from '../../function-helpers/SendToPage';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestItems,
  receiveItems,
  sendError,
} from '../../store/reducers/items/actions';

const initialFilter = {
  min: null,
  max: null,
  companyIds: [],
};

export default function Category() {
  const [filter, setFilter] = useState(initialFilter);
  const { categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  useEffect(() => {
    setFilter(initialFilter);
    if (items[categoryName + '_' + page]) return;
    dispatch(requestItems());
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        dispatch(
          receiveItems(categoryName, page, res.items, res.uniqueCompanies)
        ); //(category, categoryPage, items, uniqueCompanies)
      } else {
        dispatch(sendError(res.message));
      }
    };
    fetchingItems();
  }, [categoryName]);

  useEffect(() => {
    // if (!parseInt(page)) {
    //   return;
    // }
    if (page === '1') return;
    if (items[categoryName + '_' + page]) return;
    console.log('category page changed');
    dispatch(requestItems());

    /////Fetch items by Category Only
    // if (parseInt(page)) {
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        // setItems(res.items);
        dispatch(
          receiveItems(categoryName, page, res.items, res.uniqueCompanies)
        );
      } else {
        dispatch(sendError(res.message));
      }
    };
    fetchingItems();
    // }
  }, [page]);

  if (items.status === 'loading') {
    return <div>Loading Items in Category</div>;
  }
  if (items.status === 'idle' && items[categoryName + '_' + page]) {
    console.log('item', items);

    return (
      <Wrapper className="category">
        <div className="category__filter">
          <FilterBox filter={filter} setFilter={setFilter} />
        </div>
        <div className="category__and__pagination">
          <div className="category__wrapper">
            {items[categoryName + '_' + page]
              ? items[categoryName + '_' + page].results.map((item, i) => {
                  let rating = Math.random() * 1 + 4;

                  return (
                    <ProductContainer
                      key={item._id}
                      className="category__container"
                    >
                      <Product
                        name="category"
                        id={item._id}
                        title={item.name}
                        price={item.price}
                        image={item.imageSrc}
                        stock={item.numInStock}
                        rating={rating}
                        item={item}
                        key={i}
                      />
                    </ProductContainer>
                  );
                })
              : null}
          </div>
          {/* PAGINATION TO CHANGE */}

          <Pagination className="pagination">
            {items[categoryName + '_' + page].previous ? (
              <button
                onClick={() =>
                  SendToPage(
                    history,
                    categoryName,
                    items[categoryName + '_' + page].previous.page
                  )
                }
              >
                Prev
              </button>
            ) : null}
            <div className="pagination__initial">{page}</div>
            {items[categoryName + '_' + page].next ? (
              <button
                onClick={() =>
                  SendToPage(
                    history,
                    categoryName,
                    items[categoryName + '_' + page].next.page
                  )
                }
              >
                Next
              </button>
            ) : null}
          </Pagination>
        </div>
      </Wrapper>
    );
  }
  return <div>Load</div>;
}

const Wrapper = styled.div``;
const ProductContainer = styled.div``;
const Pagination = styled.div``;

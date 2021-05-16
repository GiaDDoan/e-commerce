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
// import item from '../../../../server/models/item';

export default function Category() {
  const [status, setStatus] = useState('loading');
  // const [items, setItems] = useState([]);
  const { categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  useEffect(() => {
    if (items[categoryName + page]) return;
    dispatch(requestItems());
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        // setItems(res.items);
        dispatch(receiveItems(categoryName + page, res.items));
      } else {
        dispatch(sendError(res.message));
      }
    };
    fetchingItems();
  }, [categoryName]);

  useEffect(() => {
    if (items[categoryName + page]) return;
    dispatch(requestItems());
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        // setItems(res.items);
        dispatch(receiveItems(categoryName + page, res.items));
      } else {
        dispatch(sendError(res.message));
      }
    };
    fetchingItems();
  }, [page]);

  if (items.status === 'loading') {
    return <div>Loading Items in Category</div>;
  }
  if (items.status === 'idle') {
    console.log('state ', items);

    return (
      <Wrapper className="category">
        <FilterBox />
        <div className="category__and__pagination">
          <div className="category__wrapper">
            {items[categoryName + page] ? (
              items[categoryName + page].results.map((item, i) => {
                let rating = Math.random() * 1 + 4;
                return (
                  <ProductContainer key={i} className="category__container">
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
              })
            ) : (
              <div>Load</div>
            )}
          </div>
          {/* PAGINATION TO CHANGE */}
          {items[categoryName + page] ? (
            <Pagination>
              {items[categoryName + page].previous ? (
                <button
                  onClick={() =>
                    SendToPage(
                      categoryName,
                      items[categoryName + page].previous.page,
                      history
                    )
                  }
                >
                  Prev
                </button>
              ) : null}
              {/* Tenary for pages */}
              {items[categoryName + page].next &&
              items[categoryName + page].next.page === 2 ? (
                <>
                  <button>1</button>
                  <button
                    onClick={() =>
                      SendToPage(
                        categoryName,
                        items[categoryName + page].next.page,
                        history
                      )
                    }
                  >
                    {items[categoryName + page].next.page}
                  </button>
                </>
              ) : null}
              {items[categoryName + page].next &&
              items[categoryName + page].previous ? (
                <>
                  <button
                    onClick={() =>
                      SendToPage(
                        categoryName,
                        items[categoryName + page].previous.page,
                        history
                      )
                    }
                  >
                    {items[categoryName + page].previous.page}
                  </button>
                  <button
                    onClick={() => SendToPage(categoryName, page, history)}
                  >
                    {page}
                  </button>
                  <button
                    onClick={() =>
                      SendToPage(
                        categoryName,
                        items[categoryName + page].next.page,
                        history
                      )
                    }
                  >
                    {items[categoryName + page].next.page}
                  </button>
                </>
              ) : null}
              {items[categoryName + page].next ? (
                <button
                  onClick={() =>
                    SendToPage(
                      categoryName,
                      items[categoryName + page].next.page,
                      history
                    )
                  }
                >
                  Next
                </button>
              ) : null}
            </Pagination>
          ) : null}
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;
const ProductContainer = styled.div``;
const Pagination = styled.div``;

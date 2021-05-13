import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Category.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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
  const [items, setItems] = useState([]);
  const { categoryName, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const itemsState = useSelector((state) => state.items);

  useEffect(() => {
    setStatus('loading');
    dispatch(requestItems());
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        setItems(res.items);
        dispatch(receiveItems(categoryName + page, res.items));

        setStatus('idle');
      } else {
        setStatus('error');
        dispatch(sendError());
      }
    };
    fetchingItems();
  }, [categoryName]);

  useEffect(() => {
    setStatus('loading');
    const fetchingItems = async () => {
      const res = await fetchItemsByCategory(categoryName, page);
      if (res.status === 201) {
        setItems(res.items);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    };
    fetchingItems();
  }, [page]);

  if (status === 'loading') {
    return <div>Loading Items in Category</div>;
  }
  if (status === 'idle') {
    // console.log('state ', itemsState);

    return (
      <Wrapper className="category">
        <div className="category__wrapper">
          {items.results.map((item, i) => {
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
          })}
        </div>
        <Pagination>
          {items.previous ? (
            <button
              onClick={() =>
                SendToPage(categoryName, items.previous.page, history)
              }
            >
              Prev
            </button>
          ) : null}
          {/* Tenary for pages */}
          {items.next && items.next.page === 2 ? (
            <>
              <button>1</button>
              <button
                onClick={() =>
                  SendToPage(categoryName, items.next.page, history)
                }
              >
                {items.next.page}
              </button>
            </>
          ) : null}
          {items.next && items.previous ? (
            <>
              <button
                onClick={() =>
                  SendToPage(categoryName, items.previous.page, history)
                }
              >
                {items.previous.page}
              </button>
              <button onClick={() => SendToPage(categoryName, page, history)}>
                {page}
              </button>
              <button
                onClick={() =>
                  SendToPage(categoryName, items.next.page, history)
                }
              >
                {items.next.page}
              </button>
            </>
          ) : null}
          {items.next ? (
            <button
              onClick={() => SendToPage(categoryName, items.next.page, history)}
            >
              Next
            </button>
          ) : null}
        </Pagination>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;
const ProductContainer = styled.div``;
const Pagination = styled.div``;

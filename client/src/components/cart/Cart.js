import React, { useEffect } from 'react';
import styled from 'styled-components';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestCart,
  receiveCart,
  addItem,
} from '../../store/reducers/cart/actions';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(requestCart());

    const fetchCart = () => {
      //Fetch the items from the DATABASE by IDs
      dispatch(receiveCart());
    };
    fetchCart();

    // return () => {
    //   cleanup;
    // };
  }, []);

  if (cart.status === 'loading') {
    return <div>Loading cart</div>;
  }
  if (cart.status === 'idle') {
    console.log('cart', cart.items);
    return (
      <Wrapper className="wrapper">
        <div>cart</div>
        {cart.items
          ? Object.values(cart.items).map((item, i) => {
              console.log('ITEM', item);
              return <div key={i}>{item.name}</div>;
            })
          : null}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

export default Cart;

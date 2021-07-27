import React, { useEffect } from 'react';
import styled from 'styled-components';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCartItems } from '../../api-helpers/cart-helper';
import {
  requestCart,
  receiveCart,
  addItem,
} from '../../store/reducers/cart/actions';
import { fetchProductById } from '../../api-helpers/index';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // setStatus('loading');
    const fetchingCart = async () => {
      if (user.status == 'idle') {
        // console.log('USER', user.data);
        const fetchRes = await fetchCartItems(user.data._id);
        // console.log('res', fetchRes);
        fetchRes.data.map(async (userData) => {
          const itemFromBE = await fetchProductById(userData.itemId);
          const item = itemFromBE.product[0];

          const action = addItem({ ...item, qty: userData.quantity });
          dispatch(action);
        });
      }
    };
    fetchingCart();
    // return () => {
    //   cleanup;
    // };
  }, [user.data]);

  useEffect(() => {
    dispatch(requestCart());

    const fetchCart = () => {
      dispatch(receiveCart());
      console.log('CAAAAAAAAAAAART');
    };
    fetchCart();
  }, []);

  if (user.status === 'loading') {
    return null;
  }
  if (cart.status === 'loading') {
    return <div>Loading cart</div>;
  }
  if (cart.status === 'idle' && user.status === 'idle') {
    // console.log('cart', cart.items);
    console.log('user', user);
    return (
      <Wrapper className="wrapper">
        <div className="title">My Cart</div>
        {cart.items
          ? Object.values(cart.items).map((item, i) => {
              // console.log('ITEM', item);
              return (
                <div className="item-wrapper" key={i}>
                  <img src={item.imageSrc} />
                  <div className="item-price">{item.price}</div>
                </div>
              );
            })
          : null}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

export default Cart;

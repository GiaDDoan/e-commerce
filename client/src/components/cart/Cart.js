import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchCartItems } from '../../api-helpers/cart-helper';
import {
  requestCart,
  receiveCart,
  addItem,
} from '../../store/reducers/cart/actions';
import { fetchProductById } from '../../api-helpers/index';

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  //GET user cart from BE
  useEffect(() => {
    // setStatus('loading');
    dispatch(requestCart());
    const fetchingCart = async () => {
      if (user.status == 'idle') {
        const fetchRes = await fetchCartItems(user.data._id);
        fetchRes.data.map(async (userData) => {
          const itemFromBE = await fetchProductById(userData.itemId);
          const item = itemFromBE.product[0];
          // console.log('ITEM', item);
          // console.log('total', total);

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

  const handleProduct = (productId) => {
    history.push(`/product/${productId}`);
  };

  if (user.status === 'loading') {
    return null;
  }
  if (cart.status === 'loading') {
    return <div>Loading cart</div>;
  }
  if (cart.status === 'idle' && user.status === 'idle') {
    // console.log('total', total);
    console.log('CART', cart);
    return (
      <Wrapper className="wrapper">
        <div className="title">Total: {cart.total}</div>
        {cart.items
          ? Object.values(cart.items).map((item, i) => {
              const {
                _id,
                bodyLocation,
                category,
                companyId,
                imageSrc,
                name,
                numInStock,
                price,
                qty,
              } = item;

              return (
                <div
                  className="item-wrapper"
                  key={i}
                  onClick={() => handleProduct(_id)}
                >
                  <img src={imageSrc} />
                  <div className="item-price">${price}</div>
                  <div>x{qty}</div>
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

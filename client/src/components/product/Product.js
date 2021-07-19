import React from 'react';
import styled from 'styled-components';
import './Product.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestCart,
  receiveCart,
  addItem,
} from '../../store/reducers/cart/actions';

function Product({ id, name, title, image, price, rating, stock, item }) {
  const history = useHistory();
  console.log('name', item);

  const handleProduct = (productId) => {
    history.push(`/product/${productId}`);
  };
  return (
    <div onClick={() => handleProduct(id)} className={`${name}__product`}>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          <p>{rating.toFixed(2)} ⭐</p>
        </div>
      </div>

      <img src={image} alt="" />
      <div>Stock: {stock}</div>
      <button onClick={() => handleProduct(id)}>Add to Basket</button>
    </div>
  );
}

const Wrapper = styled(Link)``;

export default Product;

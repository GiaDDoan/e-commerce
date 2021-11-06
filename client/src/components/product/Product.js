import React from 'react';
import styled from 'styled-components';
import './Product.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Product({ id, name, title, image, price, rating, stock, item }) {
  const history = useHistory();
  console.log('PRO', name);

  const handleProduct = (productId) => {
    history.push(`/product/${productId}`);
  };

  return (
    <div className={`${name}__container`}>
      <div onClick={() => handleProduct(id)} className={`${name}__product`}>
        <div className="product__info">
          <p className="product-name">{title}</p>
          <p className="product__price">
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            <p>{rating.toFixed(2)} ⭐</p>
          </div>
        </div>

        <img src={image} alt="" />
        <div>Stock: {stock}</div>
      </div>
    </div>
  );
}

const Wrapper = styled(Link)``;

export default Product;

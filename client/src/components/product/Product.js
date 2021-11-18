import React, { useState } from 'react';
import styled from 'styled-components';
import './Product.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TiCancel } from 'react-icons/ti';

function Product({ id, name, title, image, price, rating, stock, item }) {
  const history = useHistory();
  const handleProduct = (productId) => {
    history.push(`/product/${productId}`);
  };

  return (
    <div className={`${name}__container`}>
      <div onClick={() => handleProduct(id)} className={`${name}__product`}>
        <div className="card-info">
          <p className="card-name">{title}</p>
          <p className="card-price">
            <strong>{price}</strong>
          </p>
          <div className="card-rating">
            <p>{rating.toFixed(2)} ⭐</p>
          </div>
        </div>
        <div className="card-img-wrapper">
          <img src={image} alt="" />
        </div>
        {stock > 0 ? (
          <div className="stock">Stock: {stock}</div>
        ) : (
          <div className="stock stock-out">
            <TiCancel className="stock-out-icon" />
            <div>Out of stock</div>
          </div>
        )}
      </div>
    </div>
  );
}

const Wrapper = styled(Link)``;

export default Product;

import React from 'react';
import './Product.css';

function Product({ id, title, image, price, rating }) {
  return (
    <div className="product">
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

      <button>Add to Basket</button>
    </div>
  );
}

export default Product;

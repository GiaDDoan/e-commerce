import React from 'react';
import './Product.css';
import { useHistory } from 'react-router-dom';

function Product({ id, name, title, image, price, rating }) {
  const history = useHistory();

  const handleProduct = (productId) => {
    history.push(`/product/${productId}`);
  };
  return (
    <div className={`${name}_product`}>
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

      <button onClick={() => handleProduct(id)}>Add to Basket</button>
    </div>
  );
}

export default Product;

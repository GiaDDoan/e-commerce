import React, { useState } from "react";
import styled from "styled-components";
import "./Product.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { TiCancel } from "react-icons/ti";

function Product({ id, name, title, image, price, rating, stock, item }) {
  const history = useHistory();
  const handleProduct = (productId) => {
    history.push(`/product/${productId}`);
  };
  const halfPrice = Math.round((price / 2) * 100) / 100;

  return (
    <div className={`${name}__container`}>
      <div onClick={() => handleProduct(id)} className={`${name}__product`}>
        <div className="card-info">
          <div className="card-name">{title}</div>
          <div className="card-price">
            {name === "category" ? (
              <strong>{price}$</strong>
            ) : (
              <div className="sales-wrapper">
                <div className="original-price">{price}$</div>
                <div className="sale-price">{halfPrice}$</div>
              </div>
            )}
          </div>
          <div className="card-rating">
            <div>{rating.toFixed(2)} ⭐</div>
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

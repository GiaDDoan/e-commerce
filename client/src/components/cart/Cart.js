import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../loading/Loading";
import { FaWindowClose } from "react-icons/fa";

import { fetchCartItems } from "../../api-helpers/cart-helper";
import {
  requestCart,
  receiveCart,
  addItem,
  removeItem,
  clearCart,
} from "../../store/reducers/cart/actions";
import { fetchProductById } from "../../api-helpers/index";

function Cart({ cartToggle, toggleCart }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  //GET user cart from BE
  useEffect(() => {
    if (user.status == "loading") return;
    dispatch(requestCart());
    const fetchingCart = async () => {
      if (user.status == "idle") {
        const fetchRes = await fetchCartItems(user.data._id);
        console.log("RES", fetchRes);
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

  useEffect(() => {}, []);

  const handleProduct = (productId) => {
    history.push(`/product/${productId}`);
  };
  const deleteProduct = (productId) => {
    dispatch(removeItem(productId));
  };
  const emptyClear = () => {
    console.log("clear");
    dispatch(clearCart());
  };

  const sendToCheckout = () => {
    history.push("/checkout");
  };

  if (cart.status === "loading") {
    return <Loading />;
  }
  if (cart.status === "idle") {
    return (
      <>
        {cartToggle === true ? (
          <Wrapper className="wrapper">
            <div className="cart-total">Total: {cart.total.toFixed(2)}</div>
            <div className="cart-items-container">
              {cart.items.length > 0
                ? cart.items.map((item, i) => {
                    const { _id, imageSrc, price, qty } = item;

                    return (
                      <div className="item-wrapper" key={i}>
                        <div
                          className="item-info"
                          onClick={() => handleProduct(_id)}
                        >
                          <img src={imageSrc} alt="cart-item-img" />
                          <div className="item-price">
                            ${price} <span>x{qty}</span>
                          </div>
                        </div>
                        <FaWindowClose
                          className="delete-item"
                          onClick={() => deleteProduct(_id)}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="cart-btn-container">
              <button
                type="button"
                className="base-fill cart-btn clear-cart"
                onClick={() => emptyClear()}
              >
                Clear Cart
              </button>
              <button
                type="button"
                className="base-fill cart-btn cart-checkout-btn"
                onClick={() => sendToCheckout()}
              >
                Checkout
              </button>
            </div>
          </Wrapper>
        ) : null}
      </>
    );
  }
}

const Wrapper = styled.div``;

export default Cart;

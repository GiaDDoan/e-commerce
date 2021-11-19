import React, { useState } from 'react';
import './Checkout.css';
import { useSelector } from 'react-redux';

const initialForm = {
  firstName: '',
  lastName: '',
  address: '',
  cardNumber: '',
};

const Checkout = () => {
  const [form, setForm] = useState(initialForm);
  const cart = useSelector((state) => state.cart);

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('FORM', form);
  };

  return (
    <div className="checkout-form-container">
      <div>Total: {cart.total.toFixed(2)}</div>
      <form className="checkout-form">
        <label>
          First Name:
          <input
            name="firstName"
            className="checkout-input"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          Last Name:
          <input
            name="lastName"
            className="checkout-input"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          Address:
          <input
            name="address"
            className="checkout-input"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          Card Number:
          <input
            name="cardNumber"
            className="checkout-input"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <input
          type="submit"
          value="Proceed to checkout"
          className="base-fill checkout-submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </form>
    </div>
  );
};

export default Checkout;

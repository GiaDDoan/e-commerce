import React, { useState } from "react";
import "./Checkout.css";
import { useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import Cards from "react-credit-cards";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-credit-cards/es/styles-compiled.css";

const Checkout = ({ setConfirmationName }) => {
  const cart = useSelector((state) => state.cart);
  const {
    handleChange,
    handleFocus,
    handleSubmit,
    handleConfirm,
    values,
    errors,
  } = useForm();

  const maxLengthCheck = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  return (
    <div className="checkout-form-container">
      <div>Total: {cart.total.toFixed(2)}</div>
      <Form onSubmit={handleSubmit} className="checkout-form-wrapper">
        <Form.Group>
          <Form.Control
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onFocus={handleFocus}
            isValid={errors.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={values.address}
            onChange={handleChange}
            onFocus={handleFocus}
            isValid={errors.address}
          />
        </Form.Group>
        <div className="card-img">
          <Cards
            cvc={values.cardSecurityCode}
            expiry={values.cardExpiration}
            focused={values.focus}
            name={values.cardName}
            number={values.cardNumber}
          />
        </div>
        <Form.Group>
          <Form.Control
            type="text"
            id="cardName"
            name="cardName"
            placeholder="Cardholder Name"
            value={values.cardName}
            onChange={handleChange}
            onFocus={handleFocus}
            isValid={errors.cname}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            id="cardNumber"
            name="cardNumber"
            placeholder="Card Number ex: 4111 1111 1111 1111"
            maxLength="16"
            onInput={maxLengthCheck}
            value={values.cardNumber}
            onChange={handleChange}
            onFocus={handleFocus}
            isValid={errors.cnumber}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="number"
                id="cardExpiration"
                name="cardExpiration"
                placeholder="Expiration"
                maxLength="4"
                onInput={maxLengthCheck}
                value={values.cardExpiration}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cexp}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                type="number"
                id="cardSecurityCode"
                name="cardSecurityCode"
                placeholder="CVC"
                maxLength="3"
                onInput={maxLengthCheck}
                value={values.cardSecurityCode}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.ccvc}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="checkout-btn-container">
          <button
            id="validationBtn"
            type="submit"
            className="checkout-btn checkout-green"
            size="block"
          >
            Validate
          </button>
          <button
            type="button"
            id="confirmBtn"
            className="checkout-btn"
            onClick={() => handleConfirm("/confirmation", setConfirmationName)}
          >
            Confirm
          </button>
        </div>
      </Form>
      {Object.keys(errors).length === 0 ? (
        <Alert id="alertMessageEmpty">Test</Alert>
      ) : (
        <Alert id="alertMessage" variant={errors.variant} show={errors.show}>
          {errors.message}
        </Alert>
      )}
    </div>
  );
};

export default Checkout;

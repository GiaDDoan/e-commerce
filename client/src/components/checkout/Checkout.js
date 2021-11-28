import React, { useState } from "react";
import "./Checkout.css";
import { useSelector } from "react-redux";
import CreditCard from "./credit-card/CreditCard";
import useForm from "../../hooks/useForm";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import Cards from "react-credit-cards";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-credit-cards/es/styles-compiled.css";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const {
    handleChange,
    handleFocus,
    handleSubmit,
    handleConfirm,
    values,
    errors,
  } = useForm();

  if (Object.keys(errors).length === 0) {
    console.log("VAR", Object.keys(errors).length);
  }

  return (
    <div className="checkout-form-container">
      <div>Total: {cart.total.toFixed(2)}</div>
      <Cards
        expiry={values.expiration}
        cvc={values.cvc}
        focused={values.focus}
        name={values.cardholderName}
        number={values.number}
      />
      <Form onSubmit={handleSubmit} class="checkout-form-wrapper">
        <Form.Group>
          <Form.Control
            type="text"
            id="cardholderName"
            name="cardholderName"
            placeholder="Cardholder Name"
            value={values.cardholderName}
            onChange={handleChange}
            onFocus={handleFocus}
            // isValid={errors.ccardholderName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            id="number"
            name="number"
            placeholder="Card number"
            value={values.number}
            onChange={handleChange}
            onFocus={handleFocus}
            // isValid={errors.cnumber}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="number"
                id="expiration"
                name="expiration"
                placeholder="Expiration"
                value={values.expiration}
                onChange={handleChange}
                onFocus={handleFocus}
                // isValid={errors.cexp}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                type="number"
                id="cvc"
                name="cvc"
                placeholder="CVC"
                value={values.cvc}
                onChange={handleChange}
                onFocus={handleFocus}
                // isValid={errors.ccvc}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="checkout-btn-container">
          <Button
            id="validationBtn"
            class="checkout-btn"
            size="block"
            type="submit"
          >
            Validate
          </Button>
          <Button
            id="confirmBtn"
            class="checkout-btn"
            onClick={() => handleConfirm("/confirmation")}
          >
            Confirm
          </Button>
        </div>
      </Form>
      {Object.keys(errors).length === 0 ? (
        <Alert id="alertMessageEmpty">Test</Alert>
      ) : (
        <Alert id="alertMessage" variant={errors.variant} show={errors.show}>
          {errors.message} {errors.variant}
        </Alert>
      )}
    </div>
  );
};

export default Checkout;

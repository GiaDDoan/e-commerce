import React, { useState } from 'react';
import './Checkout.css';
import { useSelector } from 'react-redux';
import CreditCard from './credit-card/CreditCard';
import useForm from '../../hooks/useForm';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import Cards from 'react-credit-cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-credit-cards/es/styles-compiled.css';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();

  return (
    <div className="checkout-form-container">
      <div>Total: {cart.total.toFixed(2)}</div>
      <Cards
        expiry={values.expiration}
        cvc={values.cvc}
        focused={values.focus}
        name={values.name}
        number={values.number}
      />
      <Form onSubmit={handleSubmit}>
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
        <Button size="block" id="validationButton" type="submit">
          Validate
        </Button>
      </Form>
      <Alert id="alertMessage" variant={errors.variant} show={errors.show}>
        {errors.message}
      </Alert>
    </div>
  );
};

export default Checkout;

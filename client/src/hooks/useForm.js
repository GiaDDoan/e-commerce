import React, { useState } from "react";
import validateInfo from "../function-helpers/validateInfo";
import { useHistory } from "react-router-dom";

const useForm = () => {
  const [values, setValues] = useState({
    name: "",
    address: "",
    cardName: "",
    cardNumber: "",
    cardExpiration: "",
    cardSecurityCode: "",
    focus: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleFocus = (e) => {
    // setValues({
    //   ...values,
    //   focus: e.target.name,
    // });
    setValues({
      ...values,
      focus: e.target.name === "cardSecurityCode" ? "cvc" : e.target.name,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
  };

  const handleConfirm = (url, setConfirmationName) => {
    if (errors.variant === "success") {
      setConfirmationName(`${values.name}`);
      history.push(`${url}`);
    } else {
      console.log("in else");
      setErrors({
        ...errors,
        message: "Please make sure the card is validated",
      });
      console.log("ERR", errors);
    }
  };

  return {
    handleChange,
    handleFocus,
    handleSubmit,
    handleConfirm,
    values,
    errors,
  };
};

export default useForm;

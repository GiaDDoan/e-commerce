import React, { useState } from "react";
import validateInfo from "../function-helpers/validateInfo";
import { useHistory } from "react-router-dom";

const useForm = () => {
  const [values, setValues] = useState({
    name: "",
    cardholderName: "",
    number: "",
    expiration: "",
    cvc: "",
    focus: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleFocus = (e) => {
    setValues({
      ...values,
      focus: e.target.name,
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

  const handleConfirm = (url) => {
    if (errors.variant === "success") {
      history.push(`${url}`);
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

import valid from "card-validator";

export default function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.cardNumber);

  creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
  creditCard.cardholderName = valid.cardholderName(values.cardName);
  creditCard.cvv = valid.cvv(values.cardSecurityCode);

  errors.show = true;
  errors.variant = "danger";
  errors.message = "an unknown error occured. Please try again later";
  errors.cname = false;
  errors.cnumber = false;
  errors.cexp = false;
  errors.ccvc = false;

  //CHECK FOR CARD SECURITY NUMBER
  if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
    errors.message = "Credit card CVC is not complete";
  } else if (creditCard.cvv.isValid) {
    errors.ccvc = true;
  } else {
    errors.message = "Credit card CVC is invalid";
  }

  //CHECK FOR CARD EXPIRATION

  if (values.cardExpiration === null || !values.cardExpiration.trim()) {
    errors.message = "Credit card expiration date is not complete";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Credit card expiration date is invalid";
  }

  //CHECK FOR CARD NUMBER
  if (values.cardNumber === null || !values.cardNumber.trim()) {
    errors.message = "Credit card number is not complete";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
  }

  //CHECK FOR CARD NAME
  if (values.cardName === null || !values.cardName.trim()) {
    errors.message = "Cardholder name is not complete";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Cardholder name is invalid";
  }

  console.log("ERR", errors);

  if (errors.ccvc && errors.cname && errors.cnumber && errors.cexp) {
    errors.variant = "success";
    errors.message = "Credit Card is valid";
  }

  return errors;
}

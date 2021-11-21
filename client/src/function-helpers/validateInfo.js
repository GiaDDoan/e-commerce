import valid from 'card-validator';

export default function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.number);

  creditCard.expirationDate = valid.expirationDate(values.expiration);
  creditCard.cardholderName = valid.cardholderName(values.cardholderName);
  creditCard.cvv = valid.cvv(values.ccv);

  console.log('VALID', creditCard);

  errors.show = true;
  errors.variant = 'danger';
  errors.message = 'an unknown error occured. Please try again later';
  errors.ccardHolderName = false;
  errors.cnumber = false;
  errors.cexp = false;
  errors.ccvc = false;

  if (values.cvc === null || !values.cvc.trim()) {
    errors.message = 'Credit card CVC is not complete';
  } else if (creditCard.cvv.isValid) {
    errors.ccvc = true;
  } else {
    errors.message = 'Credit card CVC is invalid';
  }

  return errors;
}

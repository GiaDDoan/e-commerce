export const requestInitialPrices = () => ({
  type: 'REQUEST_INITIAL_PRICES',
});

export const receivePrices = () => ({
  type: 'RECEIVE_PRICES',
});

export const toggleCheckbox = (index) => ({
  type: 'TOGGLE_CHECKBOX',
  index,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

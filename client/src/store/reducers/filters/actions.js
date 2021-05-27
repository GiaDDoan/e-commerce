export const requestInitialPrices = () => ({
  type: 'REQUEST_INITIAL_PRICES',
});

export const toggleCheckbox = (index) => ({
  type: 'TOGGLE_CHECKBOX',
  index,
});
export const receiveFilterItems = (categoryPage, items) => ({
  type: 'RECEIVE_FILTER_ITEMS',
  categoryPage,
  items,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

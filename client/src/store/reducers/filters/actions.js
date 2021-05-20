export const requestFilterItems = () => ({
  type: 'REQUEST_FILTER_ITEMS',
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

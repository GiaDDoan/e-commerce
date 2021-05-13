export const requestItems = () => ({
  type: 'REQUEST_ITEMS',
});

export const receiveItems = (categoryPage, items) => ({
  type: 'RECEIVE_ITEMS',
  categoryPage,
  items,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

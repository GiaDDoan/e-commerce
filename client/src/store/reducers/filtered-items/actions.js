export const requestFilteredItems = () => ({
  type: 'REQUEST_FILTERED_ITEMS',
});

export const receiveFilteredItems = (filterId, items) => ({
  type: 'RECEIVE_FILTERED_ITEMS',
  filterId,
  items,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

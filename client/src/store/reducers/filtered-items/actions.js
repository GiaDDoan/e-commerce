export const requestFilteredItems = () => ({
  type: 'REQUEST_FILTERED_ITEMS',
});

export const receiveFilteredItems = (filterId, items, page) => ({
  type: 'RECEIVE_FILTERED_ITEMS',
  filterId,
  items,
  page,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

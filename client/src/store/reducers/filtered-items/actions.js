export const requestFilteredItems = () => ({
  type: 'REQUEST_FILTERED_ITEMS',
});

export const receiveFilteredItems = (filterId, items, page, filter) => ({
  type: 'RECEIVE_FILTERED_ITEMS',
  filterId,
  items,
  page,
  filter,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

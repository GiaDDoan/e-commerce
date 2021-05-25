export const requestItems = () => ({
  type: 'REQUEST_ITEMS',
});

export const receiveItems = (category, page, items, uniqueCompanies) => ({
  type: 'RECEIVE_ITEMS',
  category,
  page,
  items,
  uniqueCompanies,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

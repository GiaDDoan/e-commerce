export const requestCart = () => ({
  type: 'REQUEST_CART',
});

export const receiveCart = (user) => ({
  type: 'RECEIVE_CART',
  user,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

export const addItem = (item) => ({
  type: 'ADD_ITEM',
  item,
});

export const removeItem = (itemId) => ({
  type: 'REMOVE_ITEM',
  itemId,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});
// export const updateQuantity = (_id, quantity) => ({
//   type: 'UPDATE_QUANTITY',
//   _id,
//   quantity,
// });

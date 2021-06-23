export const requestUsers = () => ({
  type: 'REQUEST_USERS',
});

export const receiveUsers = () => ({
  type: 'RECEIVE_USERS',
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});

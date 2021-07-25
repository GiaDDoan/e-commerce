export const fetchCartItems = (userId) => {
  console.log(userId, 'ID');
  return fetch(`/cart/items?userId=${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

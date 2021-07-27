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

export const addItemToDB = (userId, itemId, qty, stock) => {
  console.log('qty', qty);

  return fetch(
    `/cart/items?userId=${userId}&itemId=${itemId}&qty=${qty}&stock=${stock}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());
};

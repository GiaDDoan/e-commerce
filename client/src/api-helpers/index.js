export const fetchSamples = (size) => {
  return fetch(`/items/samples?size=${size}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());
};

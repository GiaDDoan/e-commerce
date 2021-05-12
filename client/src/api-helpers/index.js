export const fetchSamples = (size) => {
  return fetch(`/items/samples?size=${size}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());
};

export const fetchAllCategories = () => {
  return fetch('/items/categories/all', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());
};

export const fetchItemsByCategory = (categoryName, pageNumber) => {
  return fetch(
    `/items/categories?category=${categoryName}&page=${pageNumber}&limit=12`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  ).then((res) => res.json());
};

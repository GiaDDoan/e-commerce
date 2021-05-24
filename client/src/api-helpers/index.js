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

export const fetchItemsByPrice = (categoryName, pageNumber, min, max) => {
  return fetch(
    `/items/filters/price?category=${categoryName}&min=${min}&max=${max}&page=${pageNumber}&limit=12`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  ).then((res) => res.json());
};

export const fetchCompanyById = (companyId) => {
  return fetch(`/items/company/${companyId}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => res.json());
};

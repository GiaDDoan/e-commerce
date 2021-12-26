export const fetchSearch = (input) => {
  return fetch(`/search?searchInput=${input}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
};

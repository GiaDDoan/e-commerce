const SendToPage = (history, inCategory, page) => {
  history.push(`/category/${inCategory}/${page}`);
};

export default SendToPage;

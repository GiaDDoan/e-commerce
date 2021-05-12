const SendToPage = (inCategory, page, history) => {
  history.push(`/category/${inCategory}/${page}`);
};

export default SendToPage;

const SendToSearchPage = (history, searchValue, page) => {
  history.push(`/search/${searchValue}/${page}`);
};

export default SendToSearchPage;

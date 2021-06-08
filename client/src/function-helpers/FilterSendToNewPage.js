const FilterSendToNewPage = (history, filterId, page) => {
  history.push(`/filter/${filterId}/${page}`);
};

export default FilterSendToNewPage;

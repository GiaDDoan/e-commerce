import React from 'react';
import './Pagination.css';
import { useHistory } from 'react-router';

import SendToPage from '../../function-helpers/SendToPage';
import FilterSendToNewPage from '../../function-helpers/FilterSendToNewPage';

const Pagination = ({ option, items, categoryName, page }) => {
  const history = useHistory();
  console.log('itemsInPage', items);

  if (option === 'unfilter') {
    return (
      <div className="pagination">
        {items[categoryName + '_' + page]?.previous ? (
          <button
            onClick={() =>
              SendToPage(
                history,
                categoryName,
                items[categoryName + '_' + page].previous.page
              )
            }
          >
            Prev
          </button>
        ) : null}
        <div className="pagination__initial">{page}</div>
        {items[categoryName + '_' + page].next ? (
          <button
            onClick={() =>
              SendToPage(
                history,
                categoryName,
                items[categoryName + '_' + page].next.page
              )
            }
          >
            Next
          </button>
        ) : null}
      </div>
    );
  }
  if (option === 'filter') {
    return (
      <div className="pagination">
        {items[categoryName + '_' + page].items.previous ? (
          <button
            onClick={() =>
              FilterSendToNewPage(
                history,
                categoryName,
                items[categoryName + '_' + page].items.previous.page
              )
            }
          >
            Prev
          </button>
        ) : null}
        <div className="pagination__initial">{page}</div>
        {items[categoryName + '_' + page].items.next ? (
          <button
            onClick={() =>
              FilterSendToNewPage(
                history,
                categoryName,
                items[categoryName + '_' + page].items.next.page
              )
            }
          >
            Next
          </button>
        ) : null}
      </div>
    );
  }
};

export default Pagination;

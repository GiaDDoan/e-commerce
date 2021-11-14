import React from 'react';
import './Pagination.css';
import { useHistory } from 'react-router';

import SendToPage from '../../function-helpers/SendToPage';
import FilterSendToNewPage from '../../function-helpers/FilterSendToNewPage';

const Pagination = ({ option, items, categoryName, page }) => {
  const history = useHistory();
  console.log('ITEMS', items);

  if (option === 'unfilter') {
    return (
      <div className="pagination">
        {items?.previous ? (
          <button
            className="base-fill pagination-styling prev-btn page-btn"
            onClick={() =>
              SendToPage(history, categoryName, items.previous.page)
            }
          >
            Prev
          </button>
        ) : null}
        <div className="base-fill pagination-styling current-page">{page}</div>
        {items.next ? (
          <button
            className="base-fill pagination-styling next-btn page-btn"
            onClick={() => SendToPage(history, categoryName, items.next.page)}
          >
            Next
          </button>
        ) : null}
      </div>
    );
  }

  // if (option === 'filter') {
  //   return (
  //     <div className="pagination">
  //       {items[categoryName + '_' + page].items.previous ? (
  //         <button
  //           className="base-fill pagination-styling prev-btn page-btn"
  //           onClick={() =>
  //             FilterSendToNewPage(
  //               history,
  //               categoryName,
  //               items[categoryName + '_' + page].items.previous.page
  //             )
  //           }
  //         >
  //           Prev
  //         </button>
  //       ) : null}
  //       <div className="base-fill pagination-styling current-page">{page}</div>
  //       {items[categoryName + '_' + page].items.next ? (
  //         <button
  //           className="base-fill pagination-styling next-btn page-btn"
  //           onClick={() =>
  //             FilterSendToNewPage(
  //               history,
  //               categoryName,
  //               items[categoryName + '_' + page].items.next.page
  //             )
  //           }
  //         >
  //           Next
  //         </button>
  //       ) : null}
  //     </div>
  //   );
  // }
};

export default Pagination;

import React from "react";
import "./Pagination.css";
import { useHistory } from "react-router";

import SendToPage from "../../function-helpers/SendToPage";
import FilterSendToNewPage from "../../function-helpers/FilterSendToNewPage";
import SendToSearchPage from "../../function-helpers/SendToSearchPage";

const Pagination = ({ option, items, categoryName, page }) => {
  const history = useHistory();

  if (option === "unfilter") {
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

  if (option === "filter") {
    return (
      <div className="pagination">
        {items?.previous ? (
          <button
            className="base-fill pagination-styling prev-btn page-btn"
            onClick={() =>
              FilterSendToNewPage(history, categoryName, items?.previous.page)
            }
          >
            Prev
          </button>
        ) : null}
        <div className="base-fill pagination-styling current-page">{page}</div>
        {items?.next ? (
          <button
            className="base-fill pagination-styling next-btn page-btn"
            onClick={() =>
              FilterSendToNewPage(history, categoryName, items?.next.page)
            }
          >
            Next
          </button>
        ) : null}
      </div>
    );
  }

  if (option === "search") {
    return (
      <div className="pagination">
        {items?.previous ? (
          <button
            className="base-fill pagination-styling prev-btn page-btn"
            onClick={() =>
              SendToSearchPage(history, categoryName, items?.previous.page)
            }
          >
            Prev
          </button>
        ) : null}
        <div className="base-fill pagination-styling current-page">{page}</div>
        {items?.next ? (
          <button
            className="base-fill pagination-styling next-btn page-btn"
            onClick={() =>
              SendToSearchPage(history, categoryName, items?.next.page)
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

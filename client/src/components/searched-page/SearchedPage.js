import React, { useEffect, useState } from "react";
import "./SearchedPage.css";

import { useParams } from "react-router-dom";
import { fetchSearchWithPage } from "../../api-helpers/search-helper";
import Product from "../product/Product";
import Pagination from "../pagination/Pagination";
import Loading from "../loading/Loading";
import ErrorPage from "../error-page/ErrorPage";

const SearchedPage = () => {
  const { searchInput, page } = useParams();
  const [status, setStatus] = useState();
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    console.log("page");
    const getSearch = async () => {
      const res = await fetchSearchWithPage(searchInput, page);
      setStatus("loading");
      if (res.status === 200) {
        setSearchedResults(res.searchArray);
        setStatus("idle");
      } else {
        console.log("ERR", res.message);
        setStatus("error");
      }
    };
    getSearch();
  }, [page, searchInput]);

  if (status === "loading") {
    return <Loading className="spinner-l" />;
  } else if (status === "idle") {
    return (
      <div className="s-p-wrapper">
        <div className="s-p-products-wrapper">
          {searchedResults.results.map((product) => {
            let checkedTitle = product.name;
            const { _id, price, imageSrc, stock, rating, item } = product;

            if (product.name.length > 60) {
              let splitting = product.name.split(" ");
              let totalLength = 0;

              for (var x = 0; x < splitting.length; x++) {
                if (totalLength >= 50) {
                  checkedTitle = splitting.slice(0, x).join(" ").concat("...");
                  break;
                }
                totalLength += splitting[x].length;
              }
            }

            return (
              <Product
                name="category"
                id={_id}
                title={checkedTitle}
                price={price}
                image={imageSrc}
                stock={stock}
                rating={rating}
                item={item}
                key={_id}
              />
            );
          })}
        </div>
        <Pagination
          option="search"
          items={searchedResults}
          categoryName={searchInput}
          page={page}
        />
      </div>
    );
  } else if (status === "error") {
    return <ErrorPage />;
  } else {
    return null;
  }
};

export default SearchedPage;

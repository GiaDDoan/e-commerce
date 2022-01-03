import React, { useEffect, useState } from "react";
import "./SearchedPage.css";

import { useParams } from "react-router-dom";
import { fetchSearch } from "../../api-helpers/search-helper";
import Product from "../product/Product";

const SearchedPage = () => {
  const { searchInput } = useParams();
  const [status, setStatus] = useState();
  const [searchedArray, setSearchedArray] = useState([]);

  useEffect(() => {
    const getSearch = async () => {
      const res = await fetchSearch(searchInput);
      setStatus("loading");
      if (res.status === 200) {
        console.log(searchInput);
        console.log("res", res);
        setSearchedArray(res.searchArray);
        setStatus("idle");
      } else {
        console.log("ERR", res.message);
        setStatus("error");
      }
    };
    getSearch();
  }, [searchInput]);

  if (status === "loading") {
    return <div>loading</div>;
  } else if (status === "idle") {
    return (
      <div>
        {searchedArray.map((product) => {
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
        <div>searching</div>
      </div>
    );
  } else {
    return <div>err</div>;
  }
};

export default SearchedPage;

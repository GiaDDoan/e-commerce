import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Category from "./components/category/Category";
import ProductPage from "./components/product-page/ProductPage";
import FilteredCategory from "./components/filtered-category/FilteredCategory";
import SearchedPage from "./components/searched-page/SearchedPage";
import Cart from "./components/cart/Cart";
import ErrorPage from "./components/error-page/ErrorPage";
import Checkout from "./components/checkout/Checkout";
import ConfirmationPage from "./components/confirmation-page/ConfirmationPage";
import HistoryPage from "./components/history-page/HistoryPage";

const initialFilter = {
  min: null,
  max: null,
  companyIds: [],
  category: "",
  sort: "",
};

function App() {
  const [cartToggle, setCartToggle] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [confirmationName, setConfirmationName] = useState("");

  const toggleCart = () => {
    setCartToggle(!cartToggle);
  };

  return (
    <div>
      <Router>
        <div className="body">
          <Main className="main">
            <Header toggleCart={toggleCart} />

            <div className="content">
              <Switch>
                <Route exact path="/error">
                  <ErrorPage />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/category/:categoryName/:page">
                  <Category
                    filter={filter}
                    setFilter={setFilter}
                    initialFilter={initialFilter}
                  />
                </Route>
                <Route path="/filter/:filterId/:page">
                  <FilteredCategory filter={filter} />
                </Route>
                <Route path="/product/:productId">
                  <ProductPage setCartToggle={setCartToggle} />
                </Route>
                <Route path="/search/:searchInput/:page">
                  <SearchedPage />
                </Route>
                <Route path="/checkout">
                  <Checkout setConfirmationName={setConfirmationName} />
                </Route>
                <Route path="/confirmation">
                  <ConfirmationPage confirmationName={confirmationName} />
                </Route>
                <Route path="/history">
                  <HistoryPage />
                </Route>
              </Switch>
            </div>
          </Main>
          <Cart toggleCart={toggleCart} cartToggle={cartToggle} />
        </div>
      </Router>
    </div>
  );
}

const Main = styled.div``;
export default App;

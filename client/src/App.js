import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Category from './components/category/Category';
import ProductPage from './components/product-page/ProductPage';
import FilteredCategory from './components/filtered-category/FilteredCategory';
import Cart from './components/cart/Cart';
import ErrorPage from './components/error-page/ErrorPage';

function App() {
  const [cartToggle, setCartToggle] = useState(false);

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
                  <Category />
                </Route>
                <Route path="/filter/:filterId/:page">
                  <FilteredCategory />
                </Route>
                <Route path="/product/:productId">
                  <ProductPage />
                </Route>
              </Switch>
            </div>
          </Main>
          <Cart
            className="cart"
            toggleCart={toggleCart}
            cartToggle={cartToggle}
          />
        </div>
      </Router>
    </div>
  );
}

const Main = styled.div``;
export default App;

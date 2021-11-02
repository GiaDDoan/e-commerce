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

function App() {
  const [cartToggle, setCartToggle] = useState(false);

  const toggleCart = () => {
    setCartToggle(!cartToggle);
  };

  return (
    <div className="App">
      <Router>
        <Body className="body">
          <Main className="main">
            <Header toggleCart={toggleCart} />
            <Switch>
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
          </Main>
          <Cart
            className="cart"
            toggleCart={toggleCart}
            cartToggle={cartToggle}
          />
        </Body>
      </Router>
    </div>
  );
}

const Body = styled.div``;
const Main = styled.div``;
export default App;

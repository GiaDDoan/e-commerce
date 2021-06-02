import React from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Category from './components/category/Category';
import ProductPage from './components/product-page/ProductPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Body>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:action/:categoryName/:page">
              <Category />
            </Route>
            <Route path="/:action/:categoryName">
              <Category />
            </Route>
            <Route path="/product/:productId">
              <ProductPage />
            </Route>
          </Switch>
        </Body>
      </Router>
    </div>
  );
}

const Body = styled.div``;
export default App;

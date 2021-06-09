import React from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GoogleLogin from 'react-google-login';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Category from './components/category/Category';
import ProductPage from './components/product-page/ProductPage';
import FilteredCategory from './components/filtered-category/FilteredCategory';

function App() {
  const responseSuccessGoogle = (response) => {};
  const responseErrorGoogle = () => {};

  return (
    <div className="App">
      <GoogleLogin
        clientId="904866829945-parp58ommnnc2c3r63euaod7m4s3jt28.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <Router>
        <Header />
        <Body>
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
        </Body>
      </Router>
    </div>
  );
}

const Body = styled.div``;
export default App;

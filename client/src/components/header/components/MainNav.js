import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './MainNav.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function MainNav() {
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: 'POST',
      url: '/api/google-login',
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log('Google login success', response);
    });
  };
  const responseErrorGoogle = () => {};

  return (
    <Wrapper className="header__main">
      <Logo to="/" className="header__logo">
        E-Commerce
      </Logo>
      <SearchBar className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </SearchBar>
      <NavigationWrapper className="header__nav">
        <SignIn className="header__option">
          <span className="header__optionLineOne">Hello Guest</span>
          <GoogleLogin
            clientId="904866829945-parp58ommnnc2c3r63euaod7m4s3jt28.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
          {/* <span className="header__optionLineTwo">Sign In</span> */}
        </SignIn>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <Basket className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">0</span>
        </Basket>
      </NavigationWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const NavigationWrapper = styled.div``;
const Logo = styled(Link)``;
const SearchBar = styled.div``;
const SignIn = styled.div``;
const Basket = styled.div``;

export default MainNav;

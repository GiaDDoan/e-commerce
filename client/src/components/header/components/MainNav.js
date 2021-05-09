import React from 'react';
import styled from 'styled-components';
import './MainNav.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

function MainNav() {
  return (
    <Wrapper className="header__main">
      <div className="header__logo">E-Commerce</div>
      <SearchBar className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </SearchBar>
      <NavigationWrapper className="header__nav">
        <SignIn className="header__option">
          <span className="header__optionLineOne">Hello Guest</span>
          <span className="header__optionLineTwo">Sign In</span>
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
const SearchBar = styled.div``;
const SignIn = styled.div``;
const Basket = styled.div``;

export default MainNav;

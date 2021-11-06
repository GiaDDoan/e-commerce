import React, { useContext } from 'react';
import styled from 'styled-components';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import MainNav from './components/MainNav';
import SubNav from './components/SubNav';

export default function Header({ toggleCart }) {
  return (
    <Wrapper className="container">
      <MainNav toggleCart={toggleCart} />
      <SubNav />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

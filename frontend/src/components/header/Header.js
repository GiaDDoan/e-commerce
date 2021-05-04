import React from 'react';
import './Header.css';

import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

export default function Header() {
  return (
    <div className="header">
      <div>
        <input className="header_searchBar" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div>
        <div className="header_signIn">
          <span>Sign In</span>{' '}
        </div>
        <div className="header_basket">
          <ShoppingBasket />
          <span>0</span>
        </div>
      </div>
    </div>
  );
}

import { combineReducers } from 'redux';

import items from './items/reducer';
import prices from './filters/reducers';
import filteredItems from './filtered-items/reducers';
import user from './user/reducer';
import cart from './cart/reducer';

export default combineReducers({
  items,
  prices,
  filteredItems,
  user,
  cart,
});

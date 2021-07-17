import { combineReducers } from 'redux';

import items from './items/reducer';
import prices from './filters/reducers';
import filteredItems from './filtered-items/reducers';
import user from './user/reducer';

export default combineReducers({
  items,
  prices,
  filteredItems,
  user,
});

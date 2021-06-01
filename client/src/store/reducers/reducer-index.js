import { combineReducers } from 'redux';

import items from './items/reducer';
import prices from './filters/reducers';
import filteredItems from './filtered-items/reducers';

export default combineReducers({
  items,
  prices,
  filteredItems,
});

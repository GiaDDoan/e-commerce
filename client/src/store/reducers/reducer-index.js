import { combineReducers } from 'redux';

import items from './items/reducer';
import prices from './filters/reducers';

export default combineReducers({
  items,
  prices,
});

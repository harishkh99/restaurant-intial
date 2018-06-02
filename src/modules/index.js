import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import restaurant from './restaurant';

export default combineReducers({
  router: routerReducer,
  restaurant
});

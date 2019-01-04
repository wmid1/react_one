import { combineReducers } from 'redux';
import ColumnReducer from './ColumnReducer';
import userReducer from './userReducer';
import cardReducer from './cardReducer';

const allReducers = combineReducers({
  columnArr: ColumnReducer,
  cardReducer,
  userReducer,
});

export default allReducers;

import { combineReducers } from 'redux';
import ColumnNameReducer from './ColumnNameReducer';
import ColumnQuantity from './ColumnQuantity';
import params from './params';

const allReducers = combineReducers({
  columnNames: ColumnNameReducer,
  colBox: ColumnQuantity,
  params,
});

export default allReducers;

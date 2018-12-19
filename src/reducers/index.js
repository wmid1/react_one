import { combineReducers } from 'redux';
import ColumnNameReducer from './ColumnNameReducer';

const allReducers = combineReducers({
  columnNames: ColumnNameReducer,
});

export default allReducers;

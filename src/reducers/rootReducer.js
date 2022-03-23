import { combineReducers } from 'redux';
import notesReducer from './notes';

export const rootReducer = combineReducers({
  notesReducer,
});

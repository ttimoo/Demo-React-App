import { combineReducers } from 'redux';
import demo from './demo';
import { todoReducer } from './todo';


const rootReducer = combineReducers({
  demo: demo,
  todo: todoReducer,
});

export default rootReducer;

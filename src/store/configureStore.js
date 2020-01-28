import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import clientReducer from './reducers/clientReducer';

export const rootReducer = combineReducers({
  loginState: loginReducer,
  client: clientReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

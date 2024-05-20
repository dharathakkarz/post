import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
 import postsReducer from './reducer/Reducer'; 

const store = createStore( postsReducer,applyMiddleware(thunk));

export default store;
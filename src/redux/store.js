import { initial } from 'lodash';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import toDoApp from './modules/reducer'
import createLogger from 'redux-logger'  // redux-logger 3.0.0 以下都不用大括号，3.0.0以上：import {createLogger} from 'redux-logger'


const loggerMiddleware = createLogger();

const reducer = combineReducers({
  toDoApp
})

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
)

export default store;
import { initial } from 'lodash';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import toDoApp from './modules/toDoApp'

const loggerMiddleware = createLogger();

const reducer = combineReducers(
  toDoApp
)

export default store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
)
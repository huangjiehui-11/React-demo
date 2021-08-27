import { initial } from 'lodash';
import { connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger();

const reducer = connect(
  
)

export default store = createStore(
  reducer,
  initialState,
  applyMiddleware(loggerMiddleware)
)
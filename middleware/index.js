import logger from './logger'
import thunk from 'redux-thunk'
import duplicateCheck from './duplicateCheck'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  duplicateCheck,
  thunk,
  logger,
)

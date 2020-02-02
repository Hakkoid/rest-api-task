import { combineReducers } from 'redux'
import vehicles from './vehicles'
import dealers from './dealers'

const rootReducer = combineReducers({
  dealers,
  vehicles,
})

export default rootReducer

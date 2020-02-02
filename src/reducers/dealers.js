import { SET_DEALERS } from '../constants/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case SET_DEALERS:
      return [
        ...state,
        ...action.dealers,
      ]

    default:
      return state
  }
}

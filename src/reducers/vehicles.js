import { SET_VEHICLES, START_LOADING_VEHICLES, STOP_LOADING_VEHICLES } from '../constants/actionTypes'

const initialState = {
  pages: {},
  totalCount: 0,
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLES:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page]: action.vehicles,
        },
        totalCount: action.totalCount || state.totalCount,
        loading: action.loading || state.loading,
      }

    case START_LOADING_VEHICLES:
      return {
        ...state,
        loading: true,
      }

    case STOP_LOADING_VEHICLES:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

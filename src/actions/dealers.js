import { GET_DEALERS, SET_DEALERS } from '../constants/actionTypes'

export const getDealers = (ids) => ({
  type: GET_DEALERS,
  ids,
})

export const setDealers = (dealers) => ({
  type: SET_DEALERS,
  dealers,
})

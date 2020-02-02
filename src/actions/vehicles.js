import { GET_VEHICLES, SET_VEHICLES, START_LOADING_VEHICLES, STOP_LOADING_VEHICLES } from '../constants/actionTypes'

export const getVehicles = ({ page, pageSize }) => ({
  type: GET_VEHICLES,
  page,
  pageSize,
})

export const setVehicles = ({ vehicles, totalCount, page, loading }) => ({
  type: SET_VEHICLES,
  vehicles,
  totalCount,
  loading,
  page,
})

export const startLoadingVehicles = () => ({
  type: START_LOADING_VEHICLES,
})

export const stopLoadingVehicles = () => ({
  type: STOP_LOADING_VEHICLES,
})

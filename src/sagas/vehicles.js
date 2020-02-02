import { take, put, call, select } from 'redux-saga/effects'
import { GET_VEHICLES, SET_DEALERS } from '../constants/actionTypes'
import { setVehicles, startLoadingVehicles, stopLoadingVehicles } from '../actions/vehicles'
import { fetchVehicles } from '../api/vehicles'
import { filterDuplicate } from '../helpers/index'
import { getDealers } from '../actions/dealers'

const parseDealersToHash = (dealers) => {
  const hash = {}
  dealers.forEach((item) => { hash[item.id] = item })
  return hash
}

function* setDealersToVehiclesSaga(vehicles, page) {
  const neededDealers = []
  const dealers = yield select((state) => state.dealers)

  const hashDealers = parseDealersToHash(dealers)

  const updatedVehicles = vehicles.map((item) => {
    const car = { ...item }

    if (car.dealer) {
      if (hashDealers[car.dealer]) {
        car.dealerData = hashDealers[car.dealer]
      } else if (car.dealer) {
        neededDealers.push(car.dealer)
      }
    }

    return car
  })

  yield put(setVehicles({ vehicles: updatedVehicles, page }))
  return filterDuplicate(neededDealers)
}

export function* getVehiclesSaga() {
  while (true) {
    const { page, pageSize } = yield take(GET_VEHICLES)

    yield put(startLoadingVehicles())

    const { vehicles, totalCount } = yield call(fetchVehicles, page, pageSize)
    yield put(setVehicles({ vehicles, page, totalCount }))

    const neededDealers = yield call(setDealersToVehiclesSaga, vehicles, page)

    if (neededDealers.length) {
      yield put(getDealers(neededDealers))
      yield take(SET_DEALERS)
      yield call(setDealersToVehiclesSaga, vehicles, page)
    }

    yield put(stopLoadingVehicles())
  }
}

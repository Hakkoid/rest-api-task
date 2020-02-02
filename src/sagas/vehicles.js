import { take, put, call, select } from 'redux-saga/effects'
import { GET_VEHICLES } from '../constants/actionTypes'
import { setVehicles, startLoadingVehicles, stopLoadingVehicles } from '../actions/vehicles'
import { fetchVehicles } from '../api/vehicles'
import { fetchDealers } from '../api/dealers'
import { setDealers } from '../actions/dealers'
import { filterDuplicate } from '../helpers/index'

const parseDealersToHash = (dealers) => {
  const hash = {}
  dealers.forEach((item) => { hash[item.id] = item })
  return hash
}

export function* getVehiclesSaga() {
  while (true) {
    const { page, pageSize } = yield take(GET_VEHICLES)
    yield put(startLoadingVehicles())
    const answer = yield call(fetchVehicles, page, pageSize)
    let { vehicles } = answer
    const { totalCount } = answer

    const dealers = yield select((state) => state.dealers)

    let hashDealers = parseDealersToHash(dealers)

    let neededDealers = []
    vehicles = vehicles.map((item) => {
      const car = { ...item }

      if (hashDealers[car.dealer]) {
        car.dealerData = hashDealers[car.dealer]
      } else if (car.dealer) {
        neededDealers.push(car.dealer)
      }

      return car
    })
    neededDealers = filterDuplicate(neededDealers)

    yield put(setVehicles({ vehicles, page, totalCount }))

    if (neededDealers.length) {
      const resDealers = yield call(fetchDealers, neededDealers)

      hashDealers = parseDealersToHash(resDealers)

      vehicles = vehicles.map((item) => {
        const car = { ...item }

        if (!car.dealerData && car.dealer) {
          car.dealerData = hashDealers[car.dealer]
        }
        return car
      })

      yield put(setDealers(resDealers))
      yield put(setVehicles({ vehicles, page }))
    }

    yield put(stopLoadingVehicles())
  }
}

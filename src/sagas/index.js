import { fork } from 'redux-saga/effects'
import { getDealersSaga } from './dealers'
import { getVehiclesSaga } from './vehicles'

export function* rootSaga() {
  yield fork(getDealersSaga)
  yield fork(getVehiclesSaga)
}

import { take, put, call } from 'redux-saga/effects'

import { GET_DEALERS } from '../constants/actionTypes'
import { setDealers } from '../actions/dealers'
import { fetchDealers } from '../api/dealers'

export function* getDealersSaga() {
  while (true) {
    const { ids } = yield take(GET_DEALERS)
    const dealers = yield call(fetchDealers, ids)
    yield put(setDealers(dealers))
  }
}

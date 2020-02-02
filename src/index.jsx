import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import VehiclesTable from './components/VehiclesTable'
import store from './store'

import './style.scss'

const App = () => (
  <Provider store={store}>
    <VehiclesTable />
  </Provider>
)

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)

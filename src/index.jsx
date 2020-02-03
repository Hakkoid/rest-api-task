import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import VehiclesTable from './components/VehiclesTable'
import store from './store'
import './style.scss'

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={VehiclesTable} />
    </Router>
  </Provider>
)

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)

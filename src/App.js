import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'

import './App.css'
import Login from './auth/Login'
import Home from './controllers/Home'
import Account from './controllers/Account'
import Product from './controllers/Product'
import Category from './controllers/Category'
import Purchase from './controllers/Purchase'

function App () {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/account' component={Account} />
            <Route path='/product' component={Product} />
            <Route path='/category' component={Category} />
            <Route path='/history' component={Purchase} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App

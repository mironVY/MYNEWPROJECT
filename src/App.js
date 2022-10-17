import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'

import store from './store'
import setAuthToken from './utils/setAuthToken'

import { setCurrentUser, logout } from './actions/auth'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NotFound from './components/not-found/NotFound'

if (localStorage.access_token) {
    const { access_token } = localStorage
    setAuthToken(access_token)
    const decoded = jwtDecode(access_token)
    store.dispatch(setCurrentUser(decoded))
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
        store.dispatch(logout())
        window.location.href = '/login'
    }
}

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
              <Header />
              <div className="container">
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/404" component={NotFound} />
              </div>
              <Footer />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
  )
}

export default App;

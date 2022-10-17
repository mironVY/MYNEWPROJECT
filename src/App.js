import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'

import store from './store'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import NotFound from './components/not-found/NotFound'

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
              <Header />
              <div className="container">
                  <Route path="/404" component={NotFound} />
              </div>
              <Footer />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
  )
}

export default App;

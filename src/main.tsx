import React from 'react'
import ReactDOM from 'react-dom'
import { RouterContext } from '@happysanta/router'
import { Provider } from 'react-redux'
import { router } from './routers'
import { store } from './store'
import App from './app'


ReactDOM.render(
  <RouterContext.Provider value={router}>
    <Provider store={store}>
      <App />
    </Provider>
  </RouterContext.Provider>,
  document.getElementById('root')
)

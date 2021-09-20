import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import './static/scss/index.scss'
import { rootReducer } from './redux/rootReducer'


const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
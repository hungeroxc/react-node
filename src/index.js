import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'

import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'

import logger from 'redux-logger'

const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(logger)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

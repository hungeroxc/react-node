import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'

import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import logger from 'redux-logger'

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(logger)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="ui container">
                <div className="ui three item menu">
                    <a href="#" className="item">Home</a>
                    <a href="#" className="item">Games</a>
                    <a href="#" className="item">Add New Game</a>
                </div>
                <Route path="/" component={App} />
                <Route path="/games" component={App} />
                <App />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)

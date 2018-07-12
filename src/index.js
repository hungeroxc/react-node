import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import logger from 'redux-logger'

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import App from './components/App'
import GamesPage from './components/GamesPage'

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
                    <NavLink exact activeClassName="active" to="/" className="item">Home</NavLink>
                    <NavLink exact activeClassName="active" to="/games" className="item">Games</NavLink>
                    <NavLink activeClassName="active" to="/games/new" className="item">Add New Game</NavLink>
                </div>
                <Route exact path="/" component={App} />
                <Route path="/games" component={GamesPage} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)

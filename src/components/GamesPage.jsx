import React, { Component } from 'react'
import {connect} from 'react-redux'
import GamesList from './GamesList'

class GamesPage extends Component {
    render(){
        return (
            <div>
                <GamesList games={ this.props.games }/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        games: state.games
    }
}

export default connect(mapStateToProps)(GamesPage)

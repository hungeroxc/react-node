import React, { Component } from 'react'
import {connect} from 'react-redux'
import GamesList from './GamesList'
import {fetchGames} from './../actions'

class GamesPage extends Component {

    componentDidMount() {
        this.props.fetchGames()
    }

    render(){
        console.log(this.props)
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

export default connect(mapStateToProps, {fetchGames})(GamesPage)

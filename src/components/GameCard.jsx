import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { deleteGame } from './../actions'

class GameCard extends Component {

    deleteGame = () => {
        const {_id} = this.props.game
        this.props.deleteGame(_id)
    }

    render(){
        const {cover, title, _id} = this.props.game
        return (
            <div className="ui card">
                <div className="image">
                    <img src={ cover } alt="Game Cover" />
                </div>
                <div className="content">
                    <div className="header">{ title }</div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <Link to={ `/games/${_id}` } className="ui basic button green">Edit</Link>
                        <div onClick={this.deleteGame} className="ui basic button red">Delete</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {deleteGame})(GameCard)

import React, { Component } from 'react'

class GameCard extends Component {
    render(){
        const {cover, title} = this.props.game
        return (
            <div className="ui card">
                <div className="image">
                    <img src={ cover } alt="Game Cover" />
                </div>
                <div className="content">
                    <div className="header">{ title }</div>
                </div>
            </div>
        )
    }
}

export default GameCard

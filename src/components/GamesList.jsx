import React from 'react'

const GamesList = ({games}) => {
    const emptyMsg = (
        <p>There are no games yet in your collection</p>
    )

    const gamesList = (
        <p>games list</p>
    )
    return (
        <div>
            {games.length === 0 ? emptyMsg : gamesList}
        </div>
    )
}

export default GamesList

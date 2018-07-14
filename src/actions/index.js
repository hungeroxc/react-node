import {SET_GAMES} from './../constants'

export const setGames = games => {
    return {
        type: SET_GAMES,
        games
    }
}


export const fetchGames = () => {
    return dispatch => {
        fetch('/api/games')
            .then(res => res.json())
            .then(data => dispatch(setGames(data.games)))
    }
}

export const saveGame = gameInfo => {
    return dispatch => {
        return fetch('/api/games', {
            method: 'post',
            body: JSON.stringify(gameInfo),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
    }
}

// 结果返回处理
const handleResponse = (res) => {
    if(res.ok) {
        return res.json()
    } else {
        let error = new Error(res.statusText)
        error.res = res
        throw error
    }
}

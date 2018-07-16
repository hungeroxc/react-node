import {SET_GAMES, ADD_GAME, GAME_FETCHED, UPDATE_GAME, GAME_DELETE} from './../constants'

export const addGame = game => {
    return {
        type: ADD_GAME,
        game
    }
}

export const setGames = games => {
    return {
        type: SET_GAMES,
        games
    }
}

export const gameFetched = game => {
    return {
        type: GAME_FETCHED,
        game
    }
}

export const updateGame = game => {
    return {
        type: UPDATE_GAME,
        game
    }
}

export const gameDeleted = id => {
    return {
        type: GAME_DELETE,
        id
    }
}


export const fetchGames = () => {
    return dispatch => {
        fetch(`/api/games`)
            .then(res => res.json())
            .then(data => dispatch(setGames(data.games)))
    }
}

export const fetchOneGame = id => {
    return dispatch => {
        fetch(`/api/games/${id}`)
        .then(res => res.json())
        .then(data => dispatch(gameFetched(data.game)))
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
        })
        .then(handleResponse)
        .then(gameInfo => dispatch(addGame(gameInfo.game)))
    }
}

// 编辑游戏信息
export const editGame = gameInfo => {
    return dispatch => {
        return fetch(`/api/games/${gameInfo._id}`, {
            method: 'put',
            body: JSON.stringify(gameInfo),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => dispatch(updateGame(data.game)))
    }
}

// 删除游戏
export const deleteGame = id => {
    return dispatch => {
        return fetch(`/api/games/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleResponse)
        .then(data => dispatch(gameDeleted(id)))
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

import { SET_GAMES, ADD_GAME, GAME_FETCHED, UPDATE_GAME, GAME_DELETE } from "../constants"

const games = (state = [], action = {}) => {
    switch(action.type){
        case SET_GAMES:
            return action.games
        case ADD_GAME:
            return [
                ...state,
                action.game
            ]
        case GAME_FETCHED:
            const index = state.findIndex(item => item._id === action.game._id)
            if(index > -1) {
                return state.map(item => {
                    if(item._id === action.game._id) return action.game
                    return item
                })
            } else {
                return [
                    ...state,
                    action.game
                ]
            }
        case UPDATE_GAME:
            const i = state.findIndex(item => item._id === action.game._id)
            const list = [...state]
            list[i] = action.game
            return list
        case GAME_DELETE:
            const tempList = state.filter(item => item._id !== action.id)
            return tempList
        default: 
            return state
    }
}

export default games

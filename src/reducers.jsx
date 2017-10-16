import {combineReducers} from 'redux'
import {
    SELECT_OPPONENT,
    REQUEST_OPPONENT,
    RECEIVE_OPPONENT,
    DISPLAY_OPPONENT,
    REQUEST_DECKS,
    RECEIVE_DECKS,
    //REQUEST_CARDS,
    //RECEIVE_CARDS
} from './actions'

function selectedOpponent(state = 'Greg', action ){
    switch(action.type) {
        case SELECT_OPPONENT:
            return action.opponentName
        default:
            return state
    }
}

function opponent(
    state = {
        isFetching: false,
        choices: []
    },
    action
) {
    switch(action.type) {
        case REQUEST_OPPONENT:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_OPPONENT:
            return Object.assign({}, state, {
                isFetching: false,
                choices: action.opponentImage,
                lastUpdated: action.receivedAt
            })
            default:
                return state
    }
}


function opponentImageByOpponentName(state = {}, action) {
    switch(action.type) {
        case RECEIVE_OPPONENT:
        case REQUEST_OPPONENT:
            return Object.assign({}, state, {
                [action.opponentName]: opponent(state[action.opponentImage], action)
            })
        default:
            return state
    }
}

function generateDecks(state = {
    isFetching: false
  }, action) {
  switch(action.type) {
    case REQUEST_DECKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DECKS:
      return Object.assign({}, state, {
        isFetching: false,
        deckId: action.deckId,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
/*
function generateHand(state = {
    isFetching: false
}, action) {
    switch(action.type) {
        case REQUEST_CARDS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_CARDS:
            return Object.assign({}, state, {
                isFetching: false,
                cardFace: action.cardImages,
                cardType: action.cardCodes
            })
        default:
            return state
    }
}
*/

const rootReducer = combineReducers({
    opponentImageByOpponentName,
    selectedOpponent,
    generateDecks,
    //generateHand
})

export default rootReducer
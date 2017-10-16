import fetch from 'isomorphic-fetch'

export const SELECT_OPPONENT = 'SELECTED_OPPONENT'
export const REQUEST_OPPONENT = 'REQUEST_OPPONENT'
export const RECEIVE_OPPONENT = 'RECEIVE_OPPONENT'
export const DISPLAY_OPPONENT = 'DISPLAY_OPPONENT'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const REQUEST_DECKS = 'REQUEST_DECKS'
//export const REQUEST_CARDS = 'REQUEST_CARDS'
//export const RECEIVE_CARDS = 'RECEIVE_CARDS'

function receiveOpponent(opponentName, json) {
    return {
      type: RECEIVE_OPPONENT,
      opponentName,
      opponentImage: json.imageUrl,
      receivedAt: Date.now()
    }
}

export function selectOpponent(opponentName) {
    return {
        type: SELECT_OPPONENT,
        opponentName
    }
}

function requestOpponent(opponentName) {
    return {
        type: REQUEST_OPPONENT,
        opponentName
    }
}


function shouldFetchOpponent(state, opponentName) {
    const currentOpponent = state.opponentName
    if(!currentOpponent) {
        return true
    } else {
        return false
    }
}

export function fetchOpponentIfNeeded(opponentName) {
    return (dispatch, getState) => {
        if(shouldFetchOpponent(getState(), opponentName)) {
            return dispatch(fetchOpponent(opponentName))
        }
    }
}


function fetchOpponent(opponentName) {
    return dispatch => {
        dispatch (requestOpponent(opponentName))
        return fetch(`https://robohash.p.mashape.com/index.php?text=${opponentName}`, {
            method: 'post',
            headers: {
                'X-Mashape-Key': 'RQwcdT4a3OmshfKbItKrRz6yrTwhp1CgFIKjsnm5Dho1e00ThX',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
        dispatch(receiveOpponent(opponentName, json));
        });
    }
}

//!------------------------

function fetchDecks(numDecks) {
    return dispatch => {
      dispatch(requestDecks(numDecks))
      return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numDecks}`)
        .then(response => response.json())
        .then(json => dispatch(receiveDecks(numDecks, json)))
        //.then(json => dispatch(fetchHand(2, json)))
    }
  }
  
  function receiveDecks(numDecks, json) {
    return {
      type: RECEIVE_DECKS,
      numDecks,
      deckId: json.deck_id,
      cardsRemaining: json.remaining,
      shuffled: json.shuffled,
      receivedAt: Date.now()
    }
  }
  
  function requestDecks(numDecks) {
    return {
      type: REQUEST_DECKS,
      numDecks
    }
  }
  
  export function genDecksIfNeeded(numDecks) {
    return (dispatch, getState) => {
      return dispatch(fetchDecks(numDecks))
    }
  }

  /*function fetchHand(numCards, data) {
      const deckId = data.deck_id
    return dispatch => {
        dispatch(requestCards(numCards))
        return fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=${numCards}`)
          .then(response => response.json())
          .then(json => dispatch(receiveCards(numCards,  json)))
      }
  }

  function requestCards(numCards) {
      return {
          type: REQUEST_CARDS,
          numCards,
          deckId
      }
  }

  function receiveCards(numCards, json) {
      return {
        type: RECEIVE_CARDS,
        cardImages: json.cards.forEach(el => {
            return el.image
        }),
        cardCodes: json.cards.forEach(el => {
            return el.code
        })
      }
  }
  */
import {
  getDecks,
  saveDeckTitle,
  addCardToDeck,
} from '../utils/helpers'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const GET_DECK      = 'GET_DECK'
export const ADD_DECK      = 'ADD_DECK'
export const ADD_CARD      = 'ADD-CARD'

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function handleInitialData(){
  return (dispatch) => {
    return getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks))
      })
  }
}

export function handleAddingDeck(title) {
  return (dispatch) => {
    return saveDeckTitle(title)
    .then(() => {
      dispatch(addDeck(title))
    })
  }
}

export function handleAddingCard(title, card) {
  return (dispatch) => {
    return addCardToDeck(title, card)
      .then(() => {
        dispatch(addCard(title, card))
      })
  }
}


export function getDeck(id) {
  return {
    type: GET_DECK,
    id
  }
}


function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  }
}

function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}

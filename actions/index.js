export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const GET_DECK      = 'GET_DECK'
export const ADD_DECK      = 'ADD_DECK'
export const ADD_CARD      = 'ADD-CARD'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function getDeck(id) {
  return {
    type: GET_DECK,
    id
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}

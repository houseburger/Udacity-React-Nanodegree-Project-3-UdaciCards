import {
  RECEIVE_DECKS,
  GET_DECK,
  ADD_DECK,
  ADD_CARD,
} from '../actions'


function decks (state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case GET_DECK :
      return state[action.id]
    case ADD_DECK :
      console.log('Stifler SAVE')
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      }
    case ADD_CARD :
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat([action.card])
        }
      }
    default :
      return state
  }
}

export default decks

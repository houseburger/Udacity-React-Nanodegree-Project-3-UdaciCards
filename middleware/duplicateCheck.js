// checking for duplicate Deck Names
import { ADD_DECK } from '../actions'
import { Alert } from 'react-native'

const duplicateCheck = (store) => (next) => (action) => {
  const decks = store.getState().decks
  // console.log('Jutschkii: ', decks)

  if(action.type === ADD_DECK) {
    console.log('MOFO ADD DECK')
    // console.log('DECKS: ', decks)
    console.log('DECKS: ', Object.keys(decks))
    console.log('Wanted Deck Title: ', action.title)

    // let filtered = Object.keys(decks).filter(title => title !== action.title)
    if (Object.keys(decks).includes(action.title)) {
      console.log('Title already exists => cannot save!')
      return showAlert() // the suggested title already exists, so don't save!
    }
    else{
      console.log('Title is new => save!')
      return next(action) // everything ok, just keep on going with the action!
    }
  }
  else{
    return next(action)
  }
}

const showAlert = () => {
  Alert.alert(
    'Deck already exists',
    'A deck with this title already exists.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  )
}

export default duplicateCheck

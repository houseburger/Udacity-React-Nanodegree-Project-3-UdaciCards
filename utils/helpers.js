import { AsyncStorage } from 'react-native'
import _ from 'lodash'
import { fakeDB } from './fakeDB'

const STORAGE_KEY = 'UdaciCards:decks'

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data)
      return decks
      // return fakeDB
    })
}

export function getDeck(id) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data)
      return _.get(decks, id) // or use _.pick (which would then create object and insert needed object inside that object). _.get might be more direct!
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data)
      let deck = {
        [title]: {
          title: title,
          questions: []
        }
      }
      let newData = { ...decks,  ...deck }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    })
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((data) => {
      let decks = JSON.parse(data)
      decks[title] = {
        ...decks[title],
        questions: decks[title].questions.concat([card])
      }
      console.log('AsyncStorage: ', decks)
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    })
}

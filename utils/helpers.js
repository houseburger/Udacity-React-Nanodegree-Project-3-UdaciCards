import { AsyncStorage, Alert } from 'react-native'
import { Notifications, Permissions } from 'expo'
import _ from 'lodash'

const STORAGE_KEY      = 'UdaciCards:decks'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data)
      return decks
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
      console.log('Ashton Kutcher SAVE')
      let deck = {
        [title]: {
          title: title,
          questions: [{
            question: 'Where is my car?',
            answer: 'Ashton Kutcher'
          }]
          // questions:[]
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
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    })
}


// Notifications
export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Take quiz',
    body: "👋 don't forget to take quiz today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification(View) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 0)
              tomorrow.setHours(10)
              tomorrow.setMinutes(40)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
            else { // status = 'undetermined' || 'denied'
            // console.log('Permission for Status is undetermined or denied')
              showAlert()
            }
          })
          .catch(() => {
            showAlert()
          })
      }
    })
}

let showedAlert = false

function showAlert() {
  if (showedAlert === false) {
    Alert.alert(
      'No Permission for Notifications',
      'Please allow notifications in your Settings.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    )

    showedAlert = true
  }
}

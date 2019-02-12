import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import IndividualDeck from './components/IndividualDeck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'

// Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'


const store = createStore(reducer, middleware)

// const Context = React.createContext()


const MainNavigator = createStackNavigator({
  // {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        title: 'Decks',
      }
    },
    IndividualDeck: {
      screen: IndividualDeck,
      navigationOptions: {
        title: 'Deck',
        headerStyle: {
          backgroundColor: '#00ff00'
        }
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        title: 'New Deck'
      }
    },
    NewQuestion: {
      screen: NewQuestion,
      navigationOptions: {
        title: 'New Card'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        title: 'Quiz'
      }
    },
  // },
  // {
  //   initialRouteName: "DeckList"
  // }
})

const AppContainer = createAppContainer(MainNavigator)


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppContainer />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b93fb3',
  },
})

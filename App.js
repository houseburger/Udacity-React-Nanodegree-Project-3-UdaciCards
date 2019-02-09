import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import DeckListView from './components/DeckListView'
import IndividualDeckView from './components/IndividualDeckView'

// Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'



const store = createStore(reducer, middleware)

// const Context = React.createContext()


const MainNavigator = createStackNavigator({
  // {
    DeckListView: {
      screen: DeckListView,
      // navigationOptions: {
      //   tabBarLabel: 'Decks',
      // }
    },
    IndividualDeckView: {
      screen: IndividualDeckView,
  //     // navigationOptions: {
  //     //   tabBarLabel: 'Deck',
  //     //   headerStyle: {
  //     //     backgroundColor: 'coral'
  //     //   }
      // }
    },
  // },
  // {
  //   initialRouteName: "DeckListView"
  // }
})

const AppContainer = createAppContainer(MainNavigator)


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppContainer />
          {/* <DeckListView /> */}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b93fb3',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
})

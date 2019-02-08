import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import DeckListView from './components/DeckListView'

// Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'



const store = createStore(reducer, middleware)

// const Context = React.createContext()


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckListView />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

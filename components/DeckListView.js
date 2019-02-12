import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

// Data
import { handleInitialData } from '../actions'


class DeckListView extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData()) // at first can be empty/undefined!
  }

  buttonPressed = (deckID) => {
    // console.log('Decks: ', this.props.decks)
    this.props.navigation.navigate('IndividualDeckView', {
      id: deckID
    })
  }


  render() {
    let { loading, decks } = this.props

    return (
      <View style={styles.container}>
        {
          loading === true
            ? <Text>No Decks yet! Please create a deck!</Text>
            : <View style={styles.dude}>
              {Object.values(decks).map(deck => (
                <View key={deck.title} style={styles.deck}>
                  <Text>{deck.title}</Text>
                  <Text>{deck.questions.length + ' cards'}</Text>
                  <TouchableOpacity onPress={() => this.buttonPressed(deck.title)}>
                    <Text>Go to Individual Deck View</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f26f28',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  deck: {
    backgroundColor: '#b71845',
    margin: 20,
  },
  dude: {
    backgroundColor: '#b93fb3'
  }
})

function mapStateToProps({ decks }) {
  return {
    decks,
    loading: (Object.keys(decks).length === 0 && decks.constructor === Object), // check whether data is already loaded
  }
}

export default connect(mapStateToProps)(DeckListView)

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'

class IndividualDeckList extends Component {

  showDeckLength = (deckLength) => {
    switch(true) {
      case deckLength === 1 :
        return '1 card'
      case deckLength > 1 :
        return `${deckLength} cards`
      default : // = 0
        return 'No cards'
    }
  }

  componentDidMount() {
    console.log('Individual Deck View Loaded, WTF??? ')
    // let id = props.navigation.getParam('id', 'No ID')
    // this.props.dispatch(getDeck(id))
  }

  render() {
    let { deck } = this.props
    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{this.showDeckLength(deck.questions.length)}</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('NewCard', {
          id: deck.title
        })}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={deck.questions.length === 0} style={styles.button} onPress={() => this.props.navigation.navigate('Quiz', {
          // TODO: already disabled, but add styling for disabled!!!
          id: deck.title
        })}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c53c3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#7bc043',
    padding: 10,
    margin: 20
  }
})

// could also use AsyncStorage functions, but this is better!
function mapStateToProps( { decks }, props ) {
  let id = props.navigation.getParam('id', 'No ID')
  let deck = Object.values(decks).filter(deck => deck.title === id)
  return {
    deck: deck[0]
  }
}

export default connect(mapStateToProps)(IndividualDeckList)
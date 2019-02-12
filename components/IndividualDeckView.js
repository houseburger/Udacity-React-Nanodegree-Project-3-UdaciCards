import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class IndividualDeckListView extends Component {

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
  }

  render() {
    let { deck } = this.props
    return (
      <View style={styles.container}>
        <Text>Individual Deck View</Text>
        <Text>{deck.title}</Text>
        <Text>{this.showDeckLength(deck.questions.length)}</Text>
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
})

function mapStateToProps( { decks }, props ) {
  let id = props.navigation.getParam('id', 'No ID')
  let deck = Object.values(decks).filter(deck => deck.title === id)
  return {
    deck: deck[0]
  }
}

export default connect(mapStateToProps)(IndividualDeckListView)

import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

class IndividualDeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:(
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          {
            Platform.OS === 'ios'
              ? (
                <Ionicons
                  name={'ios-arrow-back'}
                  size={30}
                  color='blue'
                />
              )
              : (
                <MaterialIcons
                  name={'arrow-back'}
                  size={30}
                  color='blue'
                />
              )
          }
          <Text>Back</Text>
        </TouchableOpacity>
      )
    }
  }

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
    let { deck, goToView } = this.props
    let questionsLength = deck.questions.length

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{this.showDeckLength(questionsLength)}</Text>
        <TouchableOpacity style={styles.button} onPress={() => goToView('NewCard', deck.title)}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={questionsLength === 0} style={styles.button} onPress={() => goToView('Quiz', deck.title)}>
        {/* // TODO: already disabled, but add styling for disabled!!! */}
          <Text>Start a Quiz</Text>
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
  console.log('decks: ', decks)
  const id = props.navigation.getParam('id', 'No ID')
  const deck = Object.values(decks).filter(deck => deck.title === id)
  return {
    deck: deck[0]
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goToView: (view, id) => navigation.navigate(view, {
      id,
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeckList)

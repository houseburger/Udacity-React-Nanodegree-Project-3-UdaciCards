import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  CenterView,
  Button, DisabledButton, ButtonText,
  Title, CardDescription,
} from './styled'

class IndividualDeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:(
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.back}
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
      <CenterView>
        <Title>{deck.title}</Title>
        <CardDescription>{this.showDeckLength(questionsLength)}</CardDescription>
        <Button onPress={() => goToView('NewCard', deck.title)}>
          <ButtonText>Add Card</ButtonText>
        </Button>
        {
          questionsLength === 0
            ? (
              <DisabledButton disabled={true}>
                <ButtonText>Start a Quiz</ButtonText>
              </DisabledButton>
            )
            : (
              <Button onPress={() => goToView('Quiz', deck.title)}>
                <ButtonText>Start a Quiz</ButtonText>
              </Button>
            )
        }
      </CenterView>
    )
  }
}


const styles = StyleSheet.create({
  back: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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

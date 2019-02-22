import React, { Component } from 'react'
import { Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  Container, DECK_BG,
  CenterView, BigText,
  HeaderButton,
  DeckBox, Title, CardDescription,
} from './styled'

// Data
import { handleInitialData } from '../actions'


class DeckList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <HeaderButton
          onPress={() => navigation.navigate('NewDeck')}
        >
          {
            Platform.OS === 'ios'
              ? <Ionicons
                  name={'ios-add'}
                  color={DECK_BG}
                  size={40}
                />
              : <MaterialIcons
                  name={'md-add'}
                  color={DECK_BG}
                  size={40}
                />
          }
        </HeaderButton>
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
    this.props.getInitialData() // at first can be empty/undefined!
  }

  buttonPressed = (id) => {
    this.props.goToDeck(id)
  }

  _renderItem = ({ item }) => (
    <DeckBox onPress={() => this.buttonPressed(item.title)}>
      <Title>{item.title}</Title>
      <CardDescription>{this.showDeckLength(item.questions.length)}</CardDescription>
    </DeckBox>
  )

  _keyExtractor = (item, index) => item.title

  render() {
    let { loading, decks } = this.props

    return (
      <Container>
        {
          loading === true
            ? (
              <CenterView>
                <BigText>No Decks yet! Please create a deck!</BigText>
              </CenterView>
            )
            : (
              <FlatList
                data={Object.values(decks)}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
            )
        }
      </Container>
    )
  }
}

function mapStateToProps({ decks }) {
  return {
    decks,
    loading: (Object.keys(decks).length === 0 && decks.constructor === Object), // check whether data is already loaded
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goToDeck: (id) => navigation.navigate('IndividualDeck', {
      id,
    }),
    getInitialData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)

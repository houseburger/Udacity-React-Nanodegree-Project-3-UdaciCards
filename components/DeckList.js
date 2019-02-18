import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  Container,
  CenterView,
  BigText,
  DeckBox,
  Title, CardDescription,
} from './styled'

// Data
import { handleInitialData } from '../actions'


class DeckList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('NewDeck')}
        >
          {
            // TODO: add Icon to this button!
            Platform.OS === 'ios'
              ? <Ionicons
                  name={'ios-add'}
                  color='#fa8072'
                  size={40}
                />
              : <MaterialIcons
                  name={'md-add'}
                  color='#fa8072'
                  size={40}
                />
          }
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
    console.log('WTF?: ', Object.values(decks))

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

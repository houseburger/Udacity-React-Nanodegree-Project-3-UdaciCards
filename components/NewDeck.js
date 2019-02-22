import React, { Component } from 'react'
import {
  KeyboardAvoidingView, ScrollView, Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { handleAddingDeck } from '../actions'
import { Header } from 'react-navigation'
import {
  BG_COLOR, PLACEHOLDER_COLOR,
  Title, InputField, CreateGrid,
} from './styled'
import ButtonChoice from './ButtonChoice'

class NewDeck extends Component {

  state = {
    title: ''
  }

  handleSubmit = () => {
    let { addDeck, goToDeck, deckTitles } = this.props
    const { title } = this.state

    // Check whether the deck name is unique!
    if (deckTitles.includes(title)) {
      showAlert()
    }
    else{
      addDeck(title)
        .then(() => goToDeck(title))
    }
  }

  render() {
    let { title } = this.state
    return (
        <KeyboardAvoidingView
          behavior='padding'
          enabled
          style={{ flex: 1, backgroundColor: BG_COLOR }}
          keyboardVerticalOffset={Header.HEIGHT + 50}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <CreateGrid>
              <Title>What should the title of the deck be?</Title>
              <InputField
                onChangeText={(title) => this.setState({title})}
                value={title}
                placeholder='Title of new deck'
                placeholderTextColor={PLACEHOLDER_COLOR}
              />
              <ButtonChoice text={'Create Deck'} shouldEnable={title.length > 1} onClicking={this.handleSubmit} />
            </CreateGrid>
          </ScrollView>
        </KeyboardAvoidingView>
    )
  }
}


const showAlert = () => {
  Alert.alert(
    'Deck already exists',
    'A deck with this title already exists.',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  )
}


function mapStateToProps({ decks }) {
  return {
    deckTitles: Object.keys(decks)
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addDeck: (title) => dispatch(handleAddingDeck(title)),
    goToDeck: (title) => navigation.navigate('IndividualDeck', {
      id: title
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)

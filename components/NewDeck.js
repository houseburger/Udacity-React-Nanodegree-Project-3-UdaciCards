import React, { Component } from 'react'
import {
  KeyboardAvoidingView, ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { handleAddingDeck } from '../actions'
import { Header } from 'react-navigation'
import {
  BG_COLOR, PLACEHOLDER_COLOR,
  Title, InputField, CreateGrid,
} from './styled'
import CreateButton from './CreateButton'

class NewDeck extends Component {

  state = {
    title: ''
  }

  handleSubmit = () => {
    let { addDeck, goToDeck } = this.props
    const { title } = this.state
    addDeck(title)
      .then(() => goToDeck(title))
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
                value={this.state.title}
                placeholder='Title of new deck'
                placeholderTextColor={PLACEHOLDER_COLOR}
              />
              <CreateButton typeText={'Deck'} hasValidInput={title.length <= 1} onSubmitting={this.handleSubmit} />
            </CreateGrid>
          </ScrollView>
        </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps() { return {} }

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addDeck: (title) => dispatch(handleAddingDeck(title)),
    goToDeck: (title) => navigation.navigate('IndividualDeck', {
      id: title
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)

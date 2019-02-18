import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { handleAddingDeck } from '../actions'
import { Header } from 'react-navigation'
import {
  Title, InputField,
  Button, DisabledButton, ButtonText,
} from './styled'

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
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 50}
      >
        <ScrollView>
          <Title>What should the title of the deck be?</Title>
          <InputField            
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            placeholder='Title of new deck'
          />
          {
            title.length <= 1
              ? (
                <DisabledButton disabled={true}>
                  <ButtonText>Create Deck</ButtonText>
                </DisabledButton>
              )
              : (
                <Button onPress={() => this.handleSubmit()}>
                  <ButtonText>Create Deck</ButtonText>
                </Button>
              )
          }
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f26f28',
  },
  button: {
    backgroundColor: '#7fffd4',
    padding: 10,
    margin: 20,
    alignItems: 'center',
  },
})

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

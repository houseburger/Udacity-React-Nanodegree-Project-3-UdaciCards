import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { handleAddingCard } from '../actions'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Title, InputField,
  Button, DisabledButton, ButtonText,
} from './styled'

class NewCard extends Component {

  state = {
    question: '',
    answer:''
  }

  updateState = (text, category) => {
    this.setState((prevState) => ({
      ...prevState,
      [category]: text
    }))
  }

  handleSubmit = () => {
    let { addCard, goBack } = this.props
    let card = {
      question: this.state.question,
      answer: this.state.answer
    }

    addCard(card)
      .then(goBack())
    // TODO: make sure it only navigates to Home AFTER saving!!!!
    // TODO: check whether saves in AsyncStorage
    // goBack()
  }

  render() {
    let { question, answer } = this.state
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={ false }
        extraHeight={100}
      >
        <Title>Please fill out fields to create this card</Title>
        <InputField
          onChangeText={(text) => this.updateState(text, 'question')}
          value={question}
          placeholder='Question'
        />
        <InputField
          onChangeText={(text) => this.updateState(text, 'answer')}
          value={answer}
          placeholder='Answer'
        />
        {
          (question.length <= 1 || answer.length <= 1)
            ? (
              <DisabledButton disabled={true}>
                <ButtonText>Create Card</ButtonText>
              </DisabledButton>
            )
            : (
              <Button onPress={() => this.handleSubmit()}>
                <ButtonText>Create Card</ButtonText>
              </Button>
            )
        }
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f26f28',
  },
  input: {
    backgroundColor: '#b93fb3',
    padding: 10,
    margin: 20,
  },
  button: {
    backgroundColor: '#7fffd4',
    padding: 10,
    margin: 20,
    alignItems: 'center',
  }
})

function mapStateToProps() { return {} } // even if empty, need it to insert before mapDispatchToProps

function mapDispatchToProps(dispatch, { navigation }) {
  const id = navigation.getParam('id', 'No ID')
  return {
    addCard: (card) => dispatch(handleAddingCard(id, card)),
    goBack: () => navigation.navigate('IndividualDeck', {
      id,
      createdNewCard: true, // bool to show notification about new card back in IndividualDeck
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)

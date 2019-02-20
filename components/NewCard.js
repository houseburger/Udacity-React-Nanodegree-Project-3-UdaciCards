import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { handleAddingCard } from '../actions'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Title, InputField, CreateView, CreateGrid,
  Button, DisabledButton, ButtonText, SubmitButton,
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
      <CreateView>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={ false }
          extraHeight={200}
        >
          <CreateGrid>
            <Title>Please fill out fields to create this card</Title>
            <View>
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
            </View>
            {
              (question.length <= 1 || answer.length <= 1)
                ? (
                  <DisabledButton disabled={true}>
                    <ButtonText>Create Card</ButtonText>
                  </DisabledButton>
                )
                : (
                  <SubmitButton onPress={() => this.handleSubmit()}>
                    <ButtonText>Create Card</ButtonText>
                  </SubmitButton>
                )
            }
          </CreateGrid>
        </KeyboardAwareScrollView>
      </CreateView>
    )
  }
}


function mapStateToProps() { return {} } // even if empty, need it to insert before mapDispatchToProps

function mapDispatchToProps(dispatch, { navigation }) {
  const id = navigation.getParam('id', 'No ID')
  return {
    addCard: (card) => {
      console.log('Adding Card...')
      return dispatch(handleAddingCard(id, card))
    },
    goBack: () => navigation.navigate('IndividualDeck', {
      id,
      createdNewCard: true, // bool to show notification about new card back in IndividualDeck
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)

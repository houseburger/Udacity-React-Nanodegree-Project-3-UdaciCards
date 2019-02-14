import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { handleAddingCard } from '../actions'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    //TODO: make sure it only navigates to Home AFTER saving!!!!
    // TODO: check whether saves in AsyncStorage
    goBack()
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={ false }
        extraHeight={100}
      >
        <Text>Please insert the question and answer for this card</Text>
        <Text style={styles.dude}>DUDE</Text>
        <Text style={styles.dude}>DUDE</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.updateState(text, 'question')}
          value={this.state.question}
          placeholder='Question'
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.updateState(text, 'answer')}
          value={this.state.answer}
          placeholder='Answer'
        />
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit()}>
          <Text>Create Card</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f26f28',
  },
  dude: {
    margin: 50,
    padding: 50,
  },
  input: {
    // flex: 1,
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
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)

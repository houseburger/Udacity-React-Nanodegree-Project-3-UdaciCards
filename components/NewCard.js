import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
// import {  }

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
    console.log('state: ', this.state)
  }

  render() {
    return (
      <View>
        <Text>Please insert the question and answer for this card</Text>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

export default NewCard

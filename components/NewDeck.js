import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { handleAddingDeck } from '../actions'
import { Header } from 'react-navigation'

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
          <Text>What should the title of the deck be?</Text>
          <Text style={styles.dude}>DUDE</Text>
          <Text style={styles.dude}>DUDE</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            placeholder='Title of new deck'
          />
          {/* TODO: styling for disabled button! */}
          <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit()} disabled={title.length <= 1}>
            <Text>Create Deck</Text>
          </TouchableOpacity>
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
  },
  dude: {
    margin: 50,
    padding: 50,
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

import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleAddingDeck } from '../actions'

class NewDeck extends Component {

  state = {
    title: ''
  }

  handleSubmit = () => {
    let { goHome, addDeck } = this.props
    addDeck(this.state.title)
    //TODO: make sure it only navigates to Home AFTER saving!!!!
    // TODO: check whether saves in AsyncStorage
    goHome()
  }

  render() {
    return (
      <View>
        <Text>What should the title of the deck be?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder='Title of new deck'
        />
        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit()}>
          <Text>Create Deck</Text>
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

function mapStateToProps() { return {} }

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addDeck: (title) => dispatch(handleAddingDeck(title)),
    goHome: () => navigation.navigate('Home')
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)

import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleAddingDeck } from '../actions'

class NewDeck extends Component {

  state = {
    title: ''
  }

  handleSubmit = () => {
    this.props.dispatch(handleAddingDeck(this.state.title))
    //TODO: make sure it only navigates to Home AFTER saving!!!!
    // TODO: check whether saves in AsyncStorage
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View>
        <Text>What should the title of the deck be?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder='DUDE WTF?'
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

function mapDispatchToProps(dispatch) {

}

export default connect()(NewDeck)

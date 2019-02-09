import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class IndividualDeckListView extends Component {

  componentDidMount() {
    console.log('Individual Deck View Loaded, WTF??? ')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is:</Text>
        <Text>Individual Deck View</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c53c3',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default IndividualDeckListView

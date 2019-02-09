import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class DeckListView extends Component {

  componentDidMount() {
    console.log('DUDE WTF???? ')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Deck List View</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('IndividualDeckView')}>
          <Text>Go to Individual Deck View</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f26f28',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
})

export default connect()(DeckListView)

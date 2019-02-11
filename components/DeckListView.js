import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

// Data
import { handleInitialData } from '../actions'


class DeckListView extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData()) // at first can be empty/undefined!
  }

  buttonPressed = () => {
    // console.log('Props: ', this.props)
    console.log('Decks: ', this.props.decks)
    // this.props.navigation.navigate('IndividualDeckView')
  }

  render() {
    let { loading } = this.props
    return (
      <View style={styles.container}>
        <Text>Deck List View</Text>
        <TouchableOpacity onPress={() => this.buttonPressed()}>
          <Text>Go to Individual Deck View</Text>
        </TouchableOpacity>
        {/* <br/> */}
        <Text>{
          // this.props.decks !== undefined
          loading === true
            ? 'Deck = empty!'
            : JSON.stringify(this.props.decks)
          // JSON.stringify(this.props.decks) || 'Deck = empty!'
        }</Text>
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

function mapStateToProps({ decks }) {
  console.log('WTF: ', decks)
  return {
    decks,
    // loading: (Object.keys(decks).length === 0 && decks.constructor === Object), // check whether data is already loaded
    loading: 1 > 2
  }
}

export default connect(mapStateToProps)(DeckListView)

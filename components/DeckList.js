import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

// Data
import { handleInitialData } from '../actions'


class DeckList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('NewDeck')}
        >
          {
            // TODO: add Icon to this button!
            Platform.OS === 'ios'
              ? <Ionicons
                  name={'ios-add'}
                  color='#fa8072'
                  size={40}
                />
              : <MaterialIcons
                  name={'md-add'}
                  color='#fa8072'
                  size={40}
                />
          }
        </TouchableOpacity>
      )
    }
  }

  showDeckLength = (deckLength) => {
    switch(true) {
      case deckLength === 1 :
        return '1 card'
      case deckLength > 1 :
        return `${deckLength} cards`
      default : // = 0
        return 'No cards'
    }
  }

  componentDidMount() {
    this.props.getInitialData() // at first can be empty/undefined!
  }

  buttonPressed = (id) => {
    this.props.goToDeck(id)
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.buttonPressed(item.title)} style={styles.deck}>
      <Text>{item.title}</Text>
      <Text>{this.showDeckLength(item.questions.length)}</Text>
    </TouchableOpacity>
  )

  _keyExtractor = (item, index) => item.title

  render() {
    let { loading, decks } = this.props
    console.log('WTF?: ', Object.values(decks))

    return (
      <View style={styles.container}>
        {
          loading === true
            ? <Text>No Decks yet! Please create a deck!</Text>
            : (
              <FlatList style={styles.dude}
                data={Object.values(decks)}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
            )
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f26f28',
    color: '#fff'
  },
  deck: {
    backgroundColor: '#b71845',
    margin: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dude: {
    backgroundColor: '#b93fb3',
    flex: 1,
  }
})

function mapStateToProps({ decks }) {
  return {
    decks,
    loading: (Object.keys(decks).length === 0 && decks.constructor === Object), // check whether data is already loaded
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goToDeck: (id) => navigation.navigate('IndividualDeck', {
      id,
    }),
    getInitialData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)

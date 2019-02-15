import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Results = (props) => {
  let { correct, total, goToView } = props
  return (
    <View>
      <Text>You finished the quiz!</Text>
      <Text>Correct Answers: {correct} out of {total}</Text>
      <Text>{(100 * correct / total).toFixed()}%</Text>
      <TouchableOpacity onPress={() => goToView('Quiz')}>
        <Text>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goToView('IndividualDeck')}>
        <Text>Back to Deck</Text>
      </TouchableOpacity>
    </View>
  )
}

function mapStateToProps(state, { navigation }) {
  const total = navigation.getParam('total', 'No total')
  const correct = navigation.getParam('correct', 'No correct')
  return {
    correct,
    total,
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const id = navigation.getParam('id', 'No ID')
  return {
    goToView: (view) => navigation.navigate(view, {
      id
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)

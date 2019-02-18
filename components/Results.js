import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container, Title, QuizNumber,
  BigText, Button, ButtonText,
} from './styled'

const Results = (props) => {
  let { correct, total, goToView } = props
  return (
    <Container>
      <Title>You finished the quiz!</Title>
      <QuizNumber>Correct Answers:</QuizNumber>
      <QuizNumber>{correct} out of {total}</QuizNumber>
      <BigText>{(100 * correct / total).toFixed()}%</BigText>
      <Button onPress={() => goToView('Quiz')}>
        <ButtonText>Restart Quiz</ButtonText>
      </Button>
      <Button onPress={() => goToView('IndividualDeck')}>
        <ButtonText>Back to Deck</ButtonText>
      </Button>
    </Container>
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

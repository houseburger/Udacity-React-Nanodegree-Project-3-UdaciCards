import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  QuizGrid, Title, QuizNumber,
  Percentage, Button, ButtonText, BottomButtons,
} from './styled'

const Results = (props) => {
  let { correct, total, goToView } = props
  return (
    <QuizGrid>
      <Title>You finished the quiz!</Title>
      <View>
        <QuizNumber>Correct Answers:</QuizNumber>
        <QuizNumber>{correct} out of {total}</QuizNumber>
        <Percentage>{(100 * correct / total).toFixed()}%</Percentage>
      </View>
      <BottomButtons>
        <Button onPress={() => goToView('Quiz')}>
          <ButtonText>Restart Quiz</ButtonText>
        </Button>
        <Button onPress={() => goToView('IndividualDeck')}>
          <ButtonText>Back to Deck</ButtonText>
        </Button>
      </BottomButtons>
    </QuizGrid>
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
      id,
      createdNewCard: false, // otherwise will show notification if created new card beforehand
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)

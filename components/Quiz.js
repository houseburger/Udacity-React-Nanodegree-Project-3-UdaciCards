import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Results from './Results'
import {
  setLocalNotification,
  clearNotification,
} from '../utils/helpers'
import {
  Container, Dude, CenterView, Title,
  QuizNumber, Button, ButtonText,
} from './styled'

class Quiz extends Component {

  state = {
    currentIndex: 0,
    showAnswer: false,
    correctAnswers: 0
  }

  reset = () => {
    // reset state, for when restarting quiz or going back to quiz
    this.setState(() => ({
      currentIndex: 0,
      showAnswer: false,
      correctAnswers: 0,
    }))
  }

  goToResults = (isCorrect, total) => {
    const { correctAnswers } = this.state
    const { goToResults } = this.props

    // no need to update state.correctAnswers, as will go to Results anyways
    const correct = isCorrect ? (correctAnswers + 1) : correctAnswers

    goToResults(correct, total) // go to results view

    this.reset() // reset quiz for when going back to quiz from results

    clearNotification() // remove existing notification and set one for tomorrow!
      .then(setLocalNotification)
  }


  saveAnswer = (isCorrect) => {
    const { currentIndex } = this.state
    const { deck } = this.props
    const total = deck.questions.length

    // when quiz is over, show quiz results, skip increasing currentIndex
    if (currentIndex + 1 === total) {
      this.goToResults(isCorrect, total)
    }
    else{ // quiz is still running!
      this.setState((prevState) => ({
        ...prevState,
        correctAnswers: isCorrect ? prevState.correctAnswers + 1 : prevState.correctAnswers, // increase correctAnswers if correct
        currentIndex: prevState.currentIndex + 1, // increase currentIndex to show next card
      }))
    }
  }

  render() {
    const { deck, id } = this.props
    console.log(`Deck + ID: ${deck}, ${id}`)
    let { currentIndex, showAnswer } = this.state
    let questions = deck.questions

    return (
      <Container>
        <Dude>
          <Title>{deck.title}</Title>
          <QuizNumber>{`${currentIndex + 1}/${questions.length}`}</QuizNumber>
        </Dude>
        <CenterView>
          <View>
            <Text>
              {showAnswer
                ? questions[currentIndex].question
                : questions[currentIndex].answer
              }
            </Text>
            <TouchableOpacity onPress={() => this.setState((prevState) => ({
              ...prevState,
              showAnswer: !prevState.showAnswer
            }))}>
              <Text>{showAnswer ? 'show question' : 'show answer'}</Text>
            </TouchableOpacity>
          </View>

          <Button onPress={() => this.saveAnswer(true)} >
            <ButtonText>Correct</ButtonText>
          </Button>
          <Button onPress={() => this.saveAnswer(false)} isFalse>
            <ButtonText>Incorrect</ButtonText>
          </Button>
        </CenterView>
      </Container>
    )
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const id = navigation.getParam('id', 'No ID')
  let deck = Object.values(decks).filter(deck => deck.title === id)[0]
  return {
    deck,
    id,
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const id = navigation.getParam('id', 'No ID')
  return {
    goToResults: (correct, total) => navigation.navigate('Results', {
      id,
      correct,
      total,
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

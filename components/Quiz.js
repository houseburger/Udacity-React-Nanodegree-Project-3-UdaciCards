import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native'
// import { Dimensions } from 'expo'
import { connect } from 'react-redux'
import Results from './Results'
import {
  setLocalNotification,
  clearNotification,
} from '../utils/helpers'
import {
  Container, CenterView, Title,
  QuizNumber, Button, ButtonText, SwitchText, QAText,
  QuizGrid, QuizTop, QuestionAnswer, BottomButtons, QuizButton,
} from './styled'

class Quiz extends Component {

  state = {
    currentIndex: 0,
    showAnswer: false,
    correctAnswers: 0,
    positionX: new Animated.Value(0),
  }

  reset = () => {
    // reset state, for when restarting quiz or going back to quiz
    this.setState(() => ({
      currentIndex: 0,
      showAnswer: false,
      correctAnswers: 0,
      positionX: new Animated.Value(0),
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
    const { currentIndex, positionX } = this.state
    const { deck } = this.props
    const total = deck.questions.length
    const duration = 300

    // move card into screen
    this.hideCardAnimation(positionX, duration)
      .start(() => {
        // when quiz is over, show quiz results, skip increasing currentIndex
        if (currentIndex + 1 === total) {
          this.goToResults(isCorrect, total)
        }
        else{ // quiz is still running, show next card!
          this.setState((prevState) => ({
            ...prevState,
            showAnswer: false, // so that user reads question first and not answer!
            correctAnswers: isCorrect ? prevState.correctAnswers + 1 : prevState.correctAnswers, // increase correctAnswers if correct
            currentIndex: prevState.currentIndex + 1, // increase currentIndex to show next card
          }))

          this.showNextCardAnimation(positionX, duration)
        }
    })
  }

  hideCardAnimation = (animProp, duration) => {
    return Animated.timing(animProp, {
      toValue: (-1 * Dimensions.get('window').width),
      duration,
    })
  }

  showNextCardAnimation = (animProp, duration) => {
    const resetCard = Animated.timing(animProp, {
      toValue: Dimensions.get('window').width,
      duration: 1 // do it so fast that cannot see with eye
    })

    // move card out of screen
    const showCard = Animated.spring(animProp, {
      toValue: 0,
      duration,
    })

    Animated.sequence([resetCard, showCard])
    .start()
  }

  render() {
    const { deck, id } = this.props
    let { currentIndex, showAnswer, positionX } = this.state
    let questions = deck.questions

    return (
      <QuizGrid>
        <QuizTop>
          <Title>{deck.title}</Title>
          <QuizNumber>{`${currentIndex + 1}/${questions.length}`}</QuizNumber>
        </QuizTop>
        <QuestionAnswer style={[ { transform: [{ translateX: positionX }] } ]}>
          <QAText>
            {showAnswer ? questions[currentIndex].answer : questions[currentIndex].question}
          </QAText>
          <TouchableOpacity onPress={() => this.setState((prevState) => ({
            ...prevState,
            showAnswer: !prevState.showAnswer
          }))}>
            <SwitchText>{showAnswer ? 'show question' : 'show answer'}</SwitchText>
          </TouchableOpacity>
        </QuestionAnswer>
        <BottomButtons>
          <QuizButton onPress={() => this.saveAnswer(true)} >
            <ButtonText>Correct</ButtonText>
          </QuizButton>
          <QuizButton onPress={() => this.saveAnswer(false)} isFalse>
            <ButtonText>Incorrect</ButtonText>
          </QuizButton>
        </BottomButtons>
      </QuizGrid>
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

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Results from './Results'

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
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{`${currentIndex + 1}/${questions.length}`}</Text>

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

        <TouchableOpacity style={styles.button} onPress={() => this.saveAnswer(true)}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.saveAnswer(false)}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: '#7bc043',
    padding: 10,
    margin: 20
  }
})

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

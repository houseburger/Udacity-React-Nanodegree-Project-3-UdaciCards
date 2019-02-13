import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {

  state = {
    currentIndex: 0,
    showAnswer: false,
    correctAnswers: 0
  }

  saveAnswer = (isCorrect) => {
    if (isCorrect) {
      this.setState((prevState) => ({
        ...prevState,
        currentIndex: prevState.currentIndex + 1,
        correctAnswers: prevState.correctAnswers + 1
      }))

    }
    else { // = incorrect
      this.setState((prevState) => ({
        ...prevState,
        currentIndex: prevState.currentIndex + 1,
      }))
    }
  }

  render() {
    let { deck, id } = this.props
    let { currentIndex, showAnswer, correctAnswers } = this.state
    let questions = deck.questions

    if (currentIndex === questions.length) {
      return (
        <View>
          <Text>finished quiz, SHOW RESULTS</Text>
          <Text>Correct Answers: {correctAnswers} out of {questions.length}</Text>
          <Text>{(100 * correctAnswers / questions.length).toFixed()}%</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{`${currentIndex + 1}/${questions.length}`}</Text>

        {showAnswer
          ? (
            <View>
              <Text>{questions[currentIndex].answer}</Text>
              <TouchableOpacity onPress={() => this.setState((prevState) => ({
                ...prevState,
                showAnswer: !prevState.showAnswer
              }))}>
                <Text>show question</Text>
              </TouchableOpacity>
            </View>
          )
          : (
            <View>
              <Text>{questions[currentIndex].question}</Text>
              <TouchableOpacity onPress={() => this.setState((prevState) => ({
                ...prevState,
                showAnswer: !prevState.showAnswer
              }))}>
              <Text>show answer</Text>
            </TouchableOpacity>
            </View>
          )
        }

        <TouchableOpacity style={styles.button} onPress={() => this.saveAnswer(true)}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.saveAnswer(false)}>
          <Text>False</Text>
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

function mapStateToProps({ decks }, props) {
  const id = props.navigation.getParam('id', 'No ID')
  let deck = Object.values(decks).filter(deck => deck.title === id)[0]
  return {
    deck,
    id,
  }
}

export default connect(mapStateToProps)(Quiz)

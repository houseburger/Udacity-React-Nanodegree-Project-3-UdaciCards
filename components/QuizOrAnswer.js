import react, { Component } from 'react'
import PropTypes from 'prop-types'

class QuizOrAnswer extends Component {
  render() {
    let { card, showAnswer, changeDisplay } = this.props
    let text = showAnswer ? card.answer : card.question

    return (
      <View>
        <Text>{questions[currentIndex].answer}</Text>
        <Text>{question.answer}</Text>
        <TouchableOpacity onPress={() => this.setState((prevState) => ({
          ...prevState,
          showAnswer: !prevState.showAnswer
        }))}>
          <Text>show question</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

QuizOrAnswer.propTypes = {
  card: PropTypes.object.isRequired,
  changeDisplay: PropTypes.func.isRequired,
  testingThis: PropTypes.string.isRequired,
  showAnswer: PropTypes.bool.isRequired
}

export default QuizOrAnswer

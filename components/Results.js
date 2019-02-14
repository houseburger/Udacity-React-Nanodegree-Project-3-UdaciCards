import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

const Results = (props) => {
  let { correct, total } = props
  return (
    <View>
      <Text>You finished the quiz!</Text>
      <Text>Correct Answers: {correct} out of {total}</Text>
      <Text>{(100 * correct / total).toFixed()}%</Text>
    </View>
  )
}

Results.propTypes = {
  correct: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default Results

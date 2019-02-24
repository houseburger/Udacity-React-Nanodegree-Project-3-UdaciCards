import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button, ButtonText, DisabledButton,
} from '../styled'

const ButtonChoice = (props) => {
  let { shouldEnable, onClicking, text } = props

  return (
    <Fragment>
      {
        shouldEnable
          ? (
            <Button onPress={() => onClicking()}>
              <ButtonText>{text}</ButtonText>
            </Button>
          )
          : (
            <DisabledButton disabled={true}>
              <ButtonText>{text}</ButtonText>
            </DisabledButton>
          )
      }
    </Fragment>
  )
}


ButtonChoice.propTypes = {
  shouldEnable: PropTypes.bool.isRequired,
  onClicking: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default ButtonChoice

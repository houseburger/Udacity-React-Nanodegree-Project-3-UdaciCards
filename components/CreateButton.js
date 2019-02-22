import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button, ButtonText, DisabledButton,
} from './styled'

const CreateButton = (props) => {
  let { hasValidInput, onSubmitting, typeText } = props
  const text = `Create ${typeText}`

  return (
    <Fragment>
      {
        hasValidInput
          ? (
            <DisabledButton disabled={true}>
              <ButtonText>{text}</ButtonText>
            </DisabledButton>
          )
          : (
            <Button onPress={() => onSubmitting()}>
              <ButtonText>{text}</ButtonText>
            </Button>
          )
      }
    </Fragment>
  )
}


CreateButton.propTypes = {
  hasValidInput: PropTypes.bool.isRequired,
  onSubmitting: PropTypes.func.isRequired,
  typeText: PropTypes.string.isRequired,
}

export default CreateButton

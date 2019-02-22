import React, { Component } from 'react'
import { Platform, Animated } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  Container, CenterView,
  Button, ButtonText, BackButton, BackText,
  Title, CardDescription, BigText,
  Notification, NotificationText,
} from './styled'
import ButtonChoice from './ButtonChoice'

class IndividualDeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:(
        <BackButton
          onPress={() => navigation.navigate('Home')}
        >
          {
            Platform.OS === 'ios'
              ? (
                <Ionicons
                  name={'ios-arrow-back'}
                  size={34}
                  color='#107BF3'
                  style={{paddingTop: 4}} // without padding the icon is not centered for some reason
                />
              )
              : (
                <MaterialIcons
                  name={'arrow-back'}
                  size={34}
                  color='#107BF3'
                  style={{paddingTop: 4}} // without padding the icon is not centered for some reason
                />
              )
          }
          <BackText>Back</BackText>
        </BackButton>
      )
    }
  }

  state = {
    animation: new Animated.Value(-100),
    alreadyShowed: false,
  }

  showDeckLength = (deckLength) => {
    switch(true) {
      case deckLength === 1 :
        return '1 card'
      case deckLength > 1 :
        return `${deckLength} cards`
      default : // = 0
        return 'No cards'
    }
  }

  notificationAnimation = () => {
    const { animation } = this.state
    const { showNotification } = this.props

    if (showNotification) {
      const duration = 1000;
      const delay    = 2500;
      const appear = Animated.timing(animation, {
        toValue: 0,
        duration,
        delay: 400,
      })

      const disappear = Animated.timing(animation, {
        toValue: -100,
        duration,
        delay,
      })

      Animated.sequence([appear, disappear])
        .start()
    }

    return showNotification
  }

  render() {
    let { animation } = this.state
    let { deck, goToView, showNotification } = this.props
    let questionsLength = deck.questions.length

    return (
      <Container>
        {
          this.notificationAnimation()
            ? (
              <Notification style={[{ transform:[{ translateY: animation }] } ]}>
                  <NotificationText>Created new card for {deck.title}! 🎉</NotificationText>
              </Notification>
            )
            : null
        }
        <CenterView>
          <BigText>{deck.title}</BigText>
          <CardDescription>{this.showDeckLength(questionsLength)}</CardDescription>
          <Button onPress={() => goToView('NewCard', deck.title)}>
            <ButtonText>Add Card</ButtonText>
          </Button>
          <ButtonChoice text={'Start a Quiz'} shouldEnable={questionsLength > 0} onClicking={() => goToView('Quiz', deck.title)} />
        </CenterView>
      </Container>
    )
  }
}


// could also use AsyncStorage functions, but this is better!
function mapStateToProps( { decks }, { navigation } ) {
  const id = navigation.getParam('id', 'No ID')
  const deck = Object.values(decks).filter(deck => deck.title === id)

  return {
    deck: deck[0],
    // whether created new card or not
    showNotification: navigation.getParam('createdNewCard', false)
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goToView: (view, id) => navigation.navigate(view, {
      id,
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeckList)

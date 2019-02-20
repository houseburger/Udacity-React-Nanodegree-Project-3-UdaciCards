import styled from 'styled-components/native'
import { Animated } from 'react-native'

const BG_COLOR = "#3498db"
const DECK_BG  = "#f39c12"
const WHITE    = "#fff"
const GREEN    = '#2ecc71'
const DARKGREEN = '#27ae60'
const RED      = '#e74c3c'
const HEADER_COLOR = "#107BF3"
const DARKBLUE = '#2c3e50'

export const Button = styled.TouchableOpacity`
  background-color: ${DECK_BG};
  min-width: 200px;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
`

// since most of text is white, just make other components inherit this!
export const Text = styled.Text`
  color: ${WHITE}
`

export const SubmitButton = styled(Button)`
  background-color: ${GREEN};
`

export const DisabledButton = styled(Button)`
opacity: 0.7;
background-color: ${DARKGREEN};
`

export const ButtonText = styled(Text)`
font-size: 26px;
`


// Quiz Component
export const QuizGrid = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${BG_COLOR};
`

export const QuizNumber = styled(Text)`
  text-align: center;
  font-size: 28px;
  margin: 10px;
`

export const QuizTop = styled.View`
  padding: 10px;
`

export const QuestionAnswer = Animated.createAnimatedComponent(styled.View`
  ${'' /* background-color: brown; */}
  align-items: center;
  flex: 1;
  justify-content: center;
`)

export const QAText = styled(Text)`
  font-size: 38px;
  padding: 10px;
  text-align: center;
`

export const SwitchText = styled.Text`
  font-size: 24px;
  margin-top: 28px;
  ${'' /* opacity: 0.8; */}
  color: #ecf0f1;
`

export const BottomButtons = styled.View`
  padding-bottom: 30px;
`

export const QuizButton = styled(Button)`
  background-color: ${props => props.isFalse ? RED : GREEN};
`

/////////////

export const Percentage = styled(Text)`
  font-size: 60px;
  text-align: center;
`

export const Notification = Animated.createAnimatedComponent(styled.View`
  background-color: ${GREEN};
  padding: 10px;
`)

export const NotificationText = styled(Text)`
  text-align: center;
  font-size: 26px;
`


export const HeaderButton = styled.TouchableOpacity`
  margin-right: 12px;
`

export const BackButton = styled.TouchableOpacity`
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const BackText = styled.Text`
  margin-left: 6px;
  color: ${HEADER_COLOR};
  font-size: 18px;
`

export const CreateView = styled.View`
  background-color: ${BG_COLOR};
  flex: 1;
`

export const CreateGrid = styled.View`
  flex: 1;
  justify-content: space-around;
`

export const InputField = styled.TextInput`
  padding: 10px;
  margin: 20px;
  font-size: 30px;
  color: ${WHITE}
  min-width: 200px;
  border: 0;
  background: transparent;
  border-bottom-width: 1px;
  border-bottom-color: ${DARKBLUE};
`

export const Title = styled(Text)`
  font-size: 38px;
  margin: 10px;
  text-align: center;
`

export const CardDescription = styled(Text)`
  font-size: 24px;
  margin-bottom: 10px;
`

export const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`

export const CenterView = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
  align-items: center;
  justify-content: center;
  font-size: 80px;
`

export const BigText = styled(Text)`
  font-size: 50px;
  text-align: center;
  padding: 14px;
`

export const DeckBox = styled.TouchableOpacity`
background-color: ${DECK_BG};
margin: 20px;
padding: 20px;
border-radius: 10px;
align-items: center;
justify-content: center;
`

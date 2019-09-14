import React from 'react';
import { 
  View, 
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { 
  Container,
  ImageStyle,
  TitleStyle,
  TextContainer,
  TextStyle,
  TextButton,
  Button,
  InputContainer,
  ButtonContainer
} from './styles';

import Text from '../../components/Text';

import Step2Image from '../../../assets/images/step2Image.png';

import CodeInput from 'react-native-confirmation-code-input';

export default function Step2({ navigation }) {
  return (
    <View
      style={Container}
    >
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={100}
      >
        <Image 
          source={Step2Image}
          style={ImageStyle}
          resizeMode="contain"
        />
        <View
          style={TextContainer}
        >
          <Text style={TitleStyle}>Verificação</Text>
          <Text
            style={TextStyle}
            regular={true}
          >
            Insira o código de 6 dígitos que foi enviado para o número <Text>+5582996615836</Text>
          </Text>
        </View>
        <View
          style={InputContainer}
        >
          <CodeInput
            secureTextEntry
            codeLength={6}
            activeColor='#00B0FF'
            inactiveColor='#00B0FF'
            autoFocus={false}
            ignoreCase={true}
            inputPosition='center'
            size={50}
            containerStyle={{ marginTop: 30 }}
            codeInputStyle={{ borderWidth: 1.5 }}
          />
        </View>  
        <View
          style={ButtonContainer}
        >
          <TouchableOpacity
            style={Button}
          >
            <Text
              regular={true}
              style={TextButton}
            >
              Continuar
            </Text>
          </TouchableOpacity>  
        </View>
        </KeyboardAvoidingView>
    </View>
  );
}

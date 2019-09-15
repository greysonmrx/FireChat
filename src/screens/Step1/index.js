import React from 'react';
import { 
  View, 
  Image,
  ScrollView,
  TextInput,
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
  PhoneNumberStyle,
  CodeCountryStyle,
  InputContainer,
  ButtonContainer
} from './styles';

import Text from '../../components/Text';

import { Entypo } from '@expo/vector-icons';

import Step1Image from '../../../assets/images/step1Image.png';

export default function Step1({ navigation }) {
  const phoneNumberRef = React.createRef();

  function focusNextField() {
    phoneNumberRef.current.focus();
  }

  return (
    <ScrollView
      style={Container}
    >
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={100}
      >
        <Image 
          source={Step1Image}
          style={ImageStyle}
          resizeMode="contain"
        />
        <View
          style={TextContainer}
        >
          <Text style={TitleStyle}>Registrar</Text>
          <Text
            style={TextStyle}
            regular={true}
          >
            O Fire<Text regular style={{ color: "#00B0FF" }}>Chat</Text> vai enviar uma mensagem de SMS para verificar seu número. Insira o código do país e seu número de telefone com DDD.
          </Text>
        </View>
        <View
          style={InputContainer}
        >
          <Entypo 
            name="plus"
            size={18}
            color="#707070"
          />
          <TextInput 
            style={CodeCountryStyle}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => focusNextField()}
          />  
          <TextInput 
            style={PhoneNumberStyle}
            keyboardType="numeric"
            returnKeyType="done"
            ref={phoneNumberRef}
          />
        </View>  
        <View
          style={ButtonContainer}
        >
          <TouchableOpacity
            style={Button}
            onPress={() => navigation.navigate("Step2")}
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
    </ScrollView>
  );
}

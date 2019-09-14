import React from 'react';
import { 
  View, 
  Image,
  TextInput,
  TouchableOpacity
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
  return (
    <View
      style={Container}
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
        />
        <TextInput 
          style={PhoneNumberStyle}
          keyboardType="numeric"
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
    </View>
  );
}
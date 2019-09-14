import React, { useState } from 'react';
import { 
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

import { 
  Container, 
  Button, 
  ImageStyle, 
  InputContainer, 
  InputEmailStyle, 
  InputPasswordStyle,
  TitleStyle,
  ButtonContainer,
  TextButton,
  ViewInputPasswordStyle
} from './styles';

import Text from '../../components/Text';

import { Ionicons } from '@expo/vector-icons';

import LoginImage from '../../../assets/images/step1Image.png';

export default function Login() {
  const [passVisibily, setPassVisibility] = useState(false);

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
        style={ImageStyle}
        source={LoginImage}
        resizeMode='contain'
      />
      
      <Text style={TitleStyle}>Olá novamente!</Text>
      <View
        style={InputContainer}
      >
        <TextInput 
          style={InputEmailStyle}
          placeholder="Seu email"
        />
        <View
          style={ViewInputPasswordStyle}
        >
          <TextInput 
            style={InputPasswordStyle}
            placeholder="Sua senha secreta"
            secureTextEntry={!passVisibily}
          />
          <Ionicons 
            name={passVisibily ? "md-eye-off" : "md-eye"}
            size={23}
            color="#404040"
            onPress={() => setPassVisibility(!passVisibily)}
          />
        </View>
      </View>
      <View
        style={ButtonContainer}
      >
        <TouchableOpacity
          style={Button}
        >
          <Text
            style={TextButton} 
            regular={true}
          >
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

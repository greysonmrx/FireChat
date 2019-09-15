import React, { useState } from 'react';
import { 
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
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

export default function Login({ navigation }) {
  const [passVisibily, setPassVisibility] = useState(false);
  const passwordInput = React.createRef();

  function focusNextField() {
    passwordInput.current.focus();
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
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => focusNextField()}
          blurOnSubmit={false}
        />
        <View
          style={ViewInputPasswordStyle}
        >
          <TextInput 
            style={InputPasswordStyle}
            placeholder="Sua senha secreta"
            secureTextEntry={!passVisibily}
            returnKeyType="done"
            ref={passwordInput}
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
    </ScrollView>
  );
}

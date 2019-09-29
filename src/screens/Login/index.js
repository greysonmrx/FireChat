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
import LoginImage from '../../../assets/images/loginImage.png';
import * as firebase from 'firebase';
import User from '../../User';

export default function Login({ navigation }) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passVisibily, setPassVisibility] = useState(false);
  const passwordInput = React.createRef();

  function focusNextField() {
    passwordInput.current.focus();
  }

  async function signIn() {
    try {
      const user = await firebase.auth()
        .signInWithEmailAndPassword(email, password);

      const { user: { uid } } = user;
      // AsyncStorage.setItem("@User", String(uid));
      User.uid = uid;
      navigation.navigate('Home');
    } catch(err) {
      console.log(err);
    }
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
          onChangeText={(text) => setEmail(text)}
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
            onChangeText={(text) => setPassword(text)}
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
          onPress={() => signIn()}
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

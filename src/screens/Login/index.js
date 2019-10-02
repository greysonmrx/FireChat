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
import Loading from '../../components/Loading';

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVisibily, setPassVisibility] = useState(false);
  const passwordInput = React.createRef();

  function validForm() {
    if (email.trim() == '') {
        alert("Insira um email válido!");
        return false;
    } else if (password.trim() == '') {
        alert("Insira uma senha válida!");
        return false;
    }

    return true;
  }

  function mapError(codeError) {
    switch (codeError) {
      case 'auth/invalid-email': {
        return 'Insira um email válido!';
      }
      case 'auth/user-disabled': {
        return 'Usuário desabilitado!';
      }
      case 'auth/user-not-found': {
        return 'Usuário não encontrado!';
      }
      case 'auth/wrong-password': {
        return 'Senha incorreta!';
      }
    }

    return null;
  }

  function focusNextField() {
    passwordInput.current.focus();
  }

  async function signIn() {
    if (validForm()) {
      try {
        setLoading(true);
        const user = await firebase.auth()
          .signInWithEmailAndPassword(email, password);
  
        const { user: { uid } } = user;
        User.uid = uid;
        setLoading(false);
        navigation.navigate('Home');
      } catch(err) {
        console.log(err, err.code);
        let error = mapError(err.code);
  
        if (error) {
          alert(error);
          setLoading(false);
        }      
      }
    }    
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
      keyboardVerticalOffset={50}
      style={Container}
    >
      <ScrollView>
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
      </ScrollView>
      {
        !!loading && <Loading />
      }
    </KeyboardAvoidingView>
  );
}

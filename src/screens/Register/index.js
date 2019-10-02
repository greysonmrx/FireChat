import React, { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Text from '../../components/Text';
import { Entypo, Ionicons } from '@expo/vector-icons';
import RegisterImage from '../../../assets/images/registerImage.png';
import * as firebase from 'firebase';

import { 
  View, 
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
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
  ButtonContainer,
  AvatarStyle,
  NameStyle,
  BioStyle,
  EmailStyle,
  PasswordStyle,
  ViewInputPasswordStyle,
  ViewBioStyle,
  ViewAvatarStyle
} from './styles';

import User from '../../User';
import Loading from '../../components/Loading';

export default function Register({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [passVisibility, setPassVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  const nameInput = React.createRef();
  const emailInput = React.createRef();
  const passwordInput = React.createRef();
  const areaInput = React.createRef();

  function focusNextField(key) {
    if (key === 1) {
      nameInput.current.focus();
    } else if (key === 2) {
      emailInput.current.focus();
    } else if (key === 3) {
      passwordInput.current.focus();
    } else {
      areaInput.current.focus();
    }
  }

  function mapError(codeError) {
    switch (codeError) {
      case 'auth/email-already-in-use': {
        return 'Este email já está sendo usado por outro usuário!'
      }
      case 'auth/invalid-email': {
        return 'Insira um email válido!'
      }
      case 'auth/operation-not-allowed': {
        return 'Operação não habilitada!'
      }
      case 'auth/weak-password': {
        return 'A senha precisa ter mais de 5 caracteres!';
      }
    }

    return null;
  }

  function validForm() {
    if (!image) {
        alert("Insira uma imagem!");
        return false;
    } else if (name.trim() == '') {
        alert("Insira um nome válido!");
        return false;
    } else if (email.trim() == '') {
        alert("Insira um email válido!");
        return false;
    } else if (password.trim() == '') {
        alert("Insira uma senha válida!");
        return false;
    } else if (bio.trim() == '') {
        alert("Insira uma biografia válida!");
        return false;
    }

    return true;
  }

  async function createUser(uri) {
    if (validForm()) {
      try {
        setLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();  
  
        const { user: { uid } } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        var userId = uid;
        const uploadTask = await firebase.storage().ref().child(`profile_pictures/${userId}`).put(blob);
  
        uploadTask.ref.getDownloadURL().then(async (downloadUrl) => {
          firebase.database().ref('users/' + userId).set({
            username: name,
            email_address: email,
            profile_picture : downloadUrl,
            biography: bio
          });
          const user = await firebase.auth()
            .signInWithEmailAndPassword(email, password);
  
          const { user: { uid } } = user;
          User.uid = uid;
          setLoading(false);
          navigation.navigate('Home');          
        });
      } catch(err) {
        let error = mapError(err.code);

        if (error) {
          alert(error);
          setLoading(false);
        }        
      }
    }    
  }

  async function signUp() {
    createUser(image);
  }

  async function getPermissionAsync() {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Desculpa, a gente precisa de permissão para fazer isso funcionar!');
      }
    }
  }

  async function _pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  useEffect(() => {
    getPermissionAsync();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
      style={Container}
    >
      <ScrollView>
          <Image 
            source={RegisterImage}
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
              Preencha os campos abaixo corretamente para poder começar a utilizar o Fire<Text regular style={{ color: "#00B0FF" }}>Chat</Text>.
            </Text>
          </View>
          <View
            style={InputContainer}
          >
            <TouchableOpacity
              onPress={() => _pickImage()} 
              style={{ elevation: 3 }}               
            >
              { image 
                ? <Image 
                    source={{uri: image}}
                    style={AvatarStyle}
                  />
                : <View
                    style={ViewAvatarStyle}
                  >
                    <Entypo 
                      name="camera"
                      size={40}
                      color="#FFFFFF"
                    />
                  </View>
              }
            </TouchableOpacity>
            <TextInput 
              style={NameStyle}
              placeholder="Seu nome e sobrenome"
              autoCapitalize="words"
              returnKeyType="next"
              ref={nameInput}
              onChangeText={(text) => setName(text)}
              onSubmitEditing={() => focusNextField(2)}
            />
            <TextInput 
              style={EmailStyle}
              placeholder="Seu melhor email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              ref={emailInput}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => focusNextField(3)}
            />
            <View
              style={ViewInputPasswordStyle}
            >
              <TextInput 
                style={PasswordStyle}
                placeholder="Uma senha secreta"
                secureTextEntry={passVisibility}
                returnKeyType="next"
                ref={passwordInput}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={() => focusNextField(4)}
              />
              <Ionicons 
                name={passVisibility ? "md-eye-off" : "md-eye"}
                size={23}
                color="#404040"
                onPress={() => setPassVisibility(!passVisibility)}
              />
            </View>   
            <View
              style={ViewBioStyle}
            >
              <TextInput 
                style={BioStyle}
                placeholder="Nos conte um pouco sobre você..."
                autoCapitalize="sentences"
                keyboardType="default"
                returnKeyType="done"
                multiline={true}
                onChangeText={(text) => setBio(text)}
                maxLength={80}
                ref={areaInput}
                onSubmitEditing={() => signUp()}
              />
            </View>  
          </View>  
          <View
            style={ButtonContainer}
          >
            <TouchableOpacity
              style={Button}
              onPress={() => signUp()}
            >
              <Text
                regular={true}
                style={TextButton}
              >
                Registrar
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

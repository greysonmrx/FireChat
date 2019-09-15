import React, { useState, useEffect } from 'react';
import { 
  View, 
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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

import Text from '../../components/Text';

import { Entypo, Ionicons } from '@expo/vector-icons';

import Step3Image from '../../../assets/images/step3Image.png';

export default function Step3({ navigation }) {
  const [image, setImage] = useState(null);
  const [passVisibility, setPassVisibility] = useState(true);

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
    <ScrollView
      style={Container}
    >
        <Image 
          source={Step3Image}
          style={ImageStyle}
          resizeMode="contain"
        />
        <View
          style={TextContainer}
        >
          <Text style={TitleStyle}>Estamos quase lá!</Text>
          <Text
            style={TextStyle}
            regular={true}
          >
            Insira mais alguns dados para poder começar a utilizar o Fire<Text regular style={{ color: "#00B0FF" }}>Chat</Text>.
          </Text>
        </View>
        <View
          style={InputContainer}
        >
          <TouchableOpacity
            onPress={() => _pickImage()}                
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
          />
          <TextInput 
            style={EmailStyle}
            placeholder="Seu melhor email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <View
            style={ViewInputPasswordStyle}
          >
            <TextInput 
              style={PasswordStyle}
              placeholder="Uma senha secreta"
              secureTextEntry={passVisibility}
              returnKeyType="next"
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
              maxLength={80}
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
              regular={true}
              style={TextButton}
            >
              Continuar
            </Text>
          </TouchableOpacity>  
        </View>
    </ScrollView>
  );
}

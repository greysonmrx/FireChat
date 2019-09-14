import React from 'react';
import {  
    View, 
    Image, 
    TouchableOpacity 
} from 'react-native';
import Text from '../../components/Text';

import { 
    Container, 
    ImageStyle, 
    ButtonLogin, 
    ButtonRegister, 
    TextContainer, 
    TitleStyle, 
    TextStyle, 
    ButtonContainer,
    TextButtonRegister,
    TextButtonLogin
} from './styles';

import WelcomeImage from '../../../assets/images/welcomeImage.png';

function Welcome({ navigation }) {
    return (
        <View
            style={Container}
        >
            <Image 
                style={ImageStyle}
                source={WelcomeImage}
                resizeMode='contain'
            />
            <View
                style={TextContainer}
            >
                <Text 
                    style={TitleStyle}
                >
                    Bem vindo ao Fire<Text style={{ color: '#00B0FF'}}>Chat</Text>!
                </Text>
                <Text 
                    style={TextStyle}
                    regular={true}
                >
                    Uma ferramenta de comunicação em tempo real em conversas privadas ou em grupos.
                </Text>
            </View>
            <View
                style={ButtonContainer}
            >
                <TouchableOpacity
                    style={ButtonLogin}
                >
                    <Text 
                        style={TextButtonLogin}
                        regular={true}
                    >
                        Entrar agora
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ButtonRegister}
                >
                    <Text 
                        style={TextButtonRegister}
                        regular={true}
                    >
                        Criar conta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

Welcome.navigationOptions = {
    header: null
}

export default Welcome;
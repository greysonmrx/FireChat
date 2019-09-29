import React from 'react';
import { View, Image } from 'react-native';

// Importando estilos dos componentes
import { Container, Title } from './styles';
import Text from '../Text';

export default function HeaderTitle({ text, navigation }) {
    if (navigation) {
        return (
            <View
                style={[Container, { flexDirection: 'column' }]}
            >
                <Text style={Title}>{navigation.getParam('username')}</Text>
                <Text style={{ fontSize: 12, color: '#707070' }} regular italic>{navigation.getParam('status').charAt(0).toUpperCase() + navigation.getParam('status').slice(1)} agora</Text>
            </View>
        );
    } else if (text) {
        return (
            <View
                style={Container}
            >
                <Text style={Title}>{text}</Text>
            </View>
        );
    } else {
        return (
            <View
                style={[Container, { flexDirection: 'row' }]}
            >
                <Image 
                    source={require("../../../assets/images/logo.png")}
                    style={{ width: 20, marginRight: 8 }}
                    resizeMode='contain'
                />
                <Text style={Title}>Fire<Text style={[Title, { color: '#00B0FF' }]}>Chat</Text></Text>
            </View>
        );
    }
}

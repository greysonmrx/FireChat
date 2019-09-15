import React from 'react';
import { View } from 'react-native';

// Importando estilos dos componentes
import { Container, Title } from './styles';
import Text from '../Text';

export default function HeaderTitle({ unauthenticated, login }) {
    if (unauthenticated) {
        if (login) {
            return (
                <View
                    style={Container}
                >
                    <Text style={Title}>Entrar</Text>
                </View>
            );
        } else {
            return (
                <View
                    style={Container}
                >
                    <Text style={Title}>Registrar</Text>
                </View>
            );
        }        
    } else {
        return null;
    }
}

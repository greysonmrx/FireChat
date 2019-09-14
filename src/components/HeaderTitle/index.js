import React from 'react';
import { View, Text } from 'react-native';

// Importando estilos dos componentes
import { Container } from './styles';

export default function HeaderTitle({ unauthenticated, step }) {
    if (unauthenticated) {
        if (!step) {
            return (
                <View
                    style={Container}
                >
                    <Text>Login</Text>
                </View>
            );
        } else {
            return (
                <View
                    style={Container}
                >
                    <Text>Passo {step}/3</Text>
                </View>
            );
        }        
    } else {
        return null;
    }
}

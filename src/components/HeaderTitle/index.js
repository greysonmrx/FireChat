import React from 'react';
import { View } from 'react-native';

// Importando estilos dos componentes
import { Container, Title } from './styles';
import Text from '../Text';

export default function HeaderTitle({ unauthenticated, step }) {
    if (unauthenticated) {
        if (!step) {
            return (
                <View
                    style={Container}
                >
                    <Text style={Title}>Login</Text>
                </View>
            );
        } else {
            return (
                <View
                    style={Container}
                >
                    <Text style={Title}>Passo {step}/3</Text>
                </View>
            );
        }        
    } else {
        return null;
    }
}

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// Importando estilos dos componentes
import { Container } from './styles';

export default function Loading() {
    return (
        <View
            style={ Container }
        >
            <ActivityIndicator 
                size="large"
                color="#00B0FF"
            />
        </View>
    );
}

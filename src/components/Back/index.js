import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importando estilos dos componentes
import { buttonContainer } from './styles';

export default function Back({ navigation }) {
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={ buttonContainer }
        >
            <Ionicons 
                name='ios-arrow-back'
                size={23}
                color="#707070"
            />
        </TouchableOpacity>
    );
}

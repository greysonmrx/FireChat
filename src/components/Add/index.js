import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';    

// Importando estilos dos componentes
import { buttonContainer } from './styles';
    
export default function Add({ navigation }) {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('AddChat')}
            style={ buttonContainer }
        >
            <Entypo
                name="plus"
                size={ 23 }
                color="#707070"
            />
        </TouchableOpacity>
    );
}

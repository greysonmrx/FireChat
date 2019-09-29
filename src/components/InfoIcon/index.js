import React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

// Importando estilos dos componentes
import { buttonContainer } from './styles';

export default function InfoIcon({ navigation }) {
    return (
       <TouchableOpacity
            onPress={() => navigation.setParams({ modal: true })}
            style={ buttonContainer }
        >
            <FontAwesome5
                name="info-circle"
                size={ 18 }
                color="#707070"
            />
        </TouchableOpacity> 
    );
}
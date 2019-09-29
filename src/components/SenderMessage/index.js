import React, { useState } from 'react';

import {
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import {
    buttonContainer,
    Container
} from './styles';

export default function RightIconChat({ func }) {
    const [message, setMessage] = useState('');

    function send() {
        func(message);
        setMessage('');
    }

    return (
        <View
            style={ Container }
        >
            <TextInput 
                placeholder="Digite uma mensagem..."
                onChangeText={(text) => setMessage(text)}
                value={message}
                style={{ width: '90%' }}
            />
            <TouchableOpacity
                onPress={() => send()}
                style={ buttonContainer }
            >
                <FontAwesome
                    name="paper-plane"
                    size={ 20 }
                    color="#00B0FF"
                />
            </TouchableOpacity>
        </View>        
    );
}
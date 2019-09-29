import React from 'react';

import {
    TouchableOpacity,
    View
} from 'react-native';

import Modal from 'react-native-modal';
import Text from '../Text';

export default function InfoModal({ visible, onPress }) {
    return (
        <Modal isVisible={visible}>
            <View style={{ backgroundColor: 'white', padding: 22, textAlign: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                <Text style={{fontSize: 20, marginBottom: 15,}}>Sobre o app</Text>
                <Text style={{fontSize: 14, marginBottom: 25, alignSelf: 'center', width: '90%'}} regular>Aplicativo de chat feito para obtenção de nota no componente curricular Tópicos Especiais.</Text>
                <TouchableOpacity
                    style={{ width: "90%", alignItems: 'center', justifyContent: 'center', backgroundColor: '#00B0FF' }}
                    onPress={() => onPress()}
                >
                    <Text style={{fontSize: 14, color: "#FFFFFF"}} regular>OK</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
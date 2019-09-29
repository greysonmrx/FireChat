import React from 'react';

import { 
    View,
    Image
} from 'react-native';

import {
    MyMessageContainer,
    Container,
    ContainerMe,
    MessageContainer
} from './styles';

import Text from '../Text';

export default function Message({ message, time, me, profilePicture }) {
    function convertTime(val) {
        let d = new Date(val);
        let c = new Date();
        let result = `${(d.getHours() < 10 ? '0' : '') + d.getHours()}:${(d.getMinutes() < 10 ? '0': '') + d.getMinutes()}`;
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }

        return result;
    }

    if (me) {
        return (
            <View style={ContainerMe}>
                <Text style={{ color: '#95989A', fontSize: 13, alignSelf: 'center' }} regular>{convertTime(time)}</Text>
                <View style={MyMessageContainer}>
                    <Text style={{ color: '#FFFFFF', fontSize: 14 }} regular>{message}</Text> 
                </View>
            </View>
        );
    } else {
        return (
            <View style={Container}>
                <Image 
                    source={{ uri: profilePicture }}
                    style={{ width: 25, height: 25, borderRadius: 100 }}
                />
                <View style={MessageContainer}>
                    <Text style={{ color: '#707070', fontSize: 14 }} regular>{message}</Text>
                </View>                   
                <Text style={{ color: '#95989A', fontSize: 13, alignSelf: 'center' }} regular>{convertTime(time)}</Text>
            </View>
        );
    }
        
}
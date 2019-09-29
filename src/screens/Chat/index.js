import React, { useEffect, useState } from 'react';

import ReversedFlatList from 'react-native-reversed-flat-list';

import {
    KeyboardAvoidingView,
    Dimensions,
    Keyboard
} from 'react-native';

import * as firebase from 'firebase';
import User from '../../User';
import Message from '../../components/Message';
import SenderMessage from '../../components/SenderMessage';

export default function Chat({ navigation }) {
    const [userId, setUserId] = useState(undefined);
    const [receiver, setReceiver] = useState({});
    const [messageList, setMessageList] = useState([]);
    const [heightScroll, setHeightScroll] = useState(0.8);
    let {width, height} = Dimensions.get('window'); 

    useEffect(() => {
        getUser();
        setReceiver({
            username: navigation.getParam('username'),
            uid: navigation.getParam('uid')
        });

        if (userId && receiver.uid) {
            var array = [];
            firebase.database().ref('messages').child(userId).child(receiver.uid)
                .on('child_added', (value) => {
                    array = array.concat(value.val());
                    setMessageList(array);
                });
            firebase.database().ref(`users/${receiver.uid}`)
                .on('value', (value) => {
                    navigation.setParams({ status: value.val().status });
                });
        }        
    }, [userId]);

    async function getUser() {
        setUserId(User.uid);
    }

    function sendMessage(messageText) {
        if (messageText.length > 0) {
            let messageId = firebase.database().ref('messages').child(userId).child(receiver.uid).push().key;
            let updates = {};
            let message = {
                message: messageText,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: receiver.uid
            }

            updates[`messages/${userId}/${receiver.uid}/${messageId}`] = message;
            updates[`messages/${receiver.uid}/${userId}/${messageId}`] = message;
            firebase.database().ref().update(updates);
        }
    }

    function renderMessage({ item }) {
        return(
            <Message
                message={item.message}
                time={item.time}
                me={item.from !== User.uid}
                profilePicture={navigation.getParam('profile_picture')}
            />
        );
    }

    return(
        <KeyboardAvoidingView
            style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}
            behavior="padding"
            enabled
            keyboardVerticalOffset={80}
        >   
            <ReversedFlatList 
                style={{ marginVertical: 20, flex: 5 }}
                data={messageList}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
            />
            <SenderMessage 
                func={(messageText) => sendMessage(messageText)}
            />
        </KeyboardAvoidingView>
    );
}
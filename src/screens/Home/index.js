import React, { useState, useEffect } from 'react';

import { 
    FlatList, 
    View, 
    TouchableOpacity,  
    Image,
    AppState
} from 'react-native';

import Text from '../../components/Text';

import * as firebase from 'firebase';
import User from '../../User';
import ItemSeparator from '../../components/ItemSeparator';
import InfoModal from '../../components/InfoModal';
import Loading from '../../components/Loading';

export default function Home({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [loggedAs, setLoggedAs] = useState(undefined);

    async function getUsers() {        
        if (loggedAs) {
            setUsers([]);
            setLoading(true);
            await firebase.database().ref('messages').child(loggedAs).on('child_added', (id) => {
                firebase.database().ref('users').on('child_added', (val) => {
                    if (id.key === val.key) {
                        firebase.database().ref('messages').child(loggedAs).child(val.key).orderByChild('timestamp').limitToLast(1).on('child_added',function(snapshot) {
                            let newUser = {
                                ...val.val(),
                                uid: val.key,
                                message: snapshot.val().message,
                                time: snapshot.val().time
                            }

                            setUsers(oldState => [newUser, ...oldState.filter(user => user.uid !== newUser.uid)]);
                            setUsers(oldState => oldState.sort((a, b) => b.time - a.time)); 
                            setLoading(false);
                        });
                    }
                });
            });
        }
    }

    function handleAppStateChange(nextAppState) {
        if (nextAppState === 'active') {
            firebase.database().ref('users').child(User.uid).update({ status: 'online' });
          } else {
              firebase.database().ref('users').child(User.uid).update({ status: 'offline' });
          }
    }

    useEffect(() => {
        setLoggedAs(User.uid);
        getUsers();
        firebase.database().ref('users').child(User.uid).update({ status: 'online' });
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        }
    }, [loggedAs]);

    function convertTime(val) {
        let d = new Date(val);
        let c = new Date();
        let result = `${(d.getHours() < 10 ? '0' : '') + d.getHours()}:${(d.getMinutes() < 10 ? '0': '') + d.getMinutes()}`;

        return result;
    }

    function renderRow({ item }) {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat", item)}
                style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center' }}
            >
                <InfoModal 
                    visible={navigation.getParam('modal')}
                    onPress={navigation.setParams({ modal: false })}
                />
                <View
                    style={{ flexDirection: 'row', width: '80%' }}
                >
                        <Image 
                            source={{ uri: item.profile_picture}}
                            style={{ width: 60, height: 60, borderRadius: 100, borderWidth: 2, borderColor: '#00B0FF' }}
                        />
                    <View
                        style={{ justifyContent: 'center', marginLeft: 15, width: '80%' }}
                    >
                        <Text style={{ fontSize: 18, color: "#333333", marginBottom: 5, maxWidth: '100%' }} regular numberLines={1}>{item.username}</Text>
                        <Text style={{ fontSize: 15, color: "#707070", maxWidth: '100%' }} regular numberLines={1}>{item.message}</Text>
                    </View>
                </View>                
                <Text style={{ fontSize: 14, color: "#707070" }} regular>{convertTime(item.time)}</Text>                
            </TouchableOpacity>
        );
    }

    return (
        <View
            style={{ flex: 1 }}
        >
            <FlatList 
                data={users}
                renderItem={renderRow}
                keyExtractor={(item) => item.uid}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={ItemSeparator}
            />
            {
                !!loading && <Loading />
            }
        </View>
    );
}
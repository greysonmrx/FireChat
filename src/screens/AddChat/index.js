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

export default function Home({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loggedAs, setLoggedAs] = useState(undefined);

    async function getUsers() {
        if (loggedAs) {
            let dbRef = firebase.database().ref('users');
            var array = [];
            dbRef.on('child_added', (val) => {
                if (val.key != loggedAs) {
                    let newUser = {
                        ...val.val(),
                        uid: val.key
                    }

                    setUsers(users.concat(newUser));
                }
            });
        }
    }

    useEffect(() => {
        setLoggedAs(User.uid);
        getUsers();
    }, [loggedAs]);

    function renderRow({ item }) {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat", item)}
                style={{ flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center' }}
            >
                <View
                    style={{ flexDirection: 'row' }}
                >
                    <Image 
                        source={{ uri: item.profile_picture}}
                        style={{ width: 60, height: 60, borderRadius: 100, borderWidth: 2, borderColor: '#00B0FF' }}
                    />
                    <View
                        style={{ justifyContent: 'center', marginLeft: 15 }}
                    >
                        <Text style={{ fontSize: 18, color: "#333333" }} regular>{item.username}</Text>
                    </View>
                </View>                              
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
        </View>
    );
}
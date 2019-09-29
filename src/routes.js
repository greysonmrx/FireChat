import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Componentes
import HeaderTitle from './components/HeaderTitle';
import Back from './components/Back';
import RightIcon from './components/RightIcon';
import InfoIcon from './components/InfoIcon';
import Add from './components/Add';

// Telas caso o usuário não esteja logado
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';

// Telas caso o usuário esteja logado
import Home from './screens/Home';


// Configuração padrão para o "header" de cada tela
const defaultOptions = {
    defaultNavigationOptions: {
        headerStyle: { 
            backgroundColor: "#FFFFFF", 
            borderBottomColor: "rgba(0, 0, 0, .3)", 
            borderBottomWidth: StyleSheet.hairlineWidth 
        },
        headerTintColor: "#FFFFFF",
    }
}

// Navegação do usuário não autenticado
const unauthenticated = createStackNavigator({
    Welcome: {
        screen: Welcome
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerTitle: (
                <HeaderTitle 
                    text="Entrar"
                />
              ),
              headerLeft: (
                  <Back
                    navigation={ navigation }
                  />
              ),
              headerRight: (
                <RightIcon />
              )
        })
    },
    Register: {
        screen: Register,
        navigationOptions: ({ navigation }) => ({
            headerTitle: (
                <HeaderTitle
                    text="Registrar"
                />
              ),
              headerLeft: (
                  <Back
                    navigation={ navigation }
                  />
              ),
              headerRight: (
                <RightIcon />
              )
        })
    }
}, {
    defaultOptions,
    initialRouteName: 'Welcome',
});

// Navegação do usuário autenticado
const authenticated = createStackNavigator({
}, {
    defaultOptions,
});

// Criando a navegação para o app principal
export default createAppContainer(
    createSwitchNavigator({
        unauthenticated,
        authenticated
    }, {
        initialRouteName: 'unauthenticated',
    })
)
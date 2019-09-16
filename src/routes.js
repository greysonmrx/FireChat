import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Componentes
import HeaderTitle from './components/HeaderTitle';
import Back from './components/Back';
import RightIcon from './components/RightIcon';

// Telas caso o usuário não esteja logado
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';

// Configuração padrão para o "header" de cada tela
const defaultOptions = {
    defaultNavigationOptions: {
        headerStyle: { 
            backgroundColor: "#FFFFFF", 
            borderBottomColor: "rgba(0, 0, 0, .3)", 
            borderBottomWidth: StyleSheet.hairlineWidth 
        },
        headerTintColor: "#FFFFFF",
    },
    initialRouteName: 'Welcome'
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
                    unauthenticated={ true }
                    login={ true }
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
                    unauthenticated={ true } 
                    step={3}
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
}, defaultOptions);

// Criando a navegação para o app principal
export default createAppContainer(unauthenticated)
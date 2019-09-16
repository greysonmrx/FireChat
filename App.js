import React, { useEffect } from 'react';

import Routes from './src/routes';
import firebase from 'firebase';
import config from './src/config/config';

console.ignoredYellowBox = ['Warning: Each', "Warning: Failed prop type", 'Setting a timer'];
console.disableYellowBox = true;

export default function App() {
    useEffect(() => {
        firebase.initializeApp(config);
    }, []);

    return <Routes />;
}
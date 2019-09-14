import React, { useEffect, useState } from 'react';
import { Text as RNText } from 'react-native';

import * as Font from 'expo-font';

export default function Text({ italic, regular, children, style }) {
    const [loadingFonts, setLoadingFonts] = useState(true);

    async function loadFont() {
        await Font.loadAsync({
            'Product_Sans_Regular': require('../../../assets/fonts/Product_Sans_Regular.ttf'),
            'Product_Sans_Italic': require('../../../assets/fonts/Product_Sans_Italic.ttf'),
            'Product_Sans_Bold': require('../../../assets/fonts/Product_Sans_Bold.ttf'),
            'Product_Sans_Bold_Italic': require('../../../assets/fonts/Product_Sans_Bold_Italic.ttf'),
        });

        setLoadingFonts(false);
    }

    useEffect(() => {
        loadFont();        
    }, []);

    function setFontType() {
        if (regular) {
            if (italic) {
                return 'Product_Sans_Italic';
            } else {
                return 'Product_Sans_Regular';
            }
        } else {
            if (italic) {
                return 'Product_Sans_Bold_Italic';
            } else {
                return 'Product_Sans_Bold';
            }
        }
    }

    if (!loadingFonts) {
        return (
            <RNText
                style={[{ fontFamily: setFontType() }, style]}
            >
                { children }
            </RNText>
        );
    } else {
        return null;
    }
}
import React from 'react';
import { View } from 'react-native';

export default function ItemSeparator() {
    return (
        <View
            style={{
                height: 1,
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, .05)',
            }}
        />
    );
}

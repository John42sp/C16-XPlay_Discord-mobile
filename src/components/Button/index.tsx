import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';


import { styles } from './style';

type Props = RectButtonProps & { //passando propriedade activeOpacity do TouchableOpacity
    title: string;
}

export function Button({ title, ...rest }: Props) { //passou todas props do TouchableOpacity pelo ...rest

    return (
        <RectButton style={styles.container}  
        {...rest }
        >           
            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    )
}
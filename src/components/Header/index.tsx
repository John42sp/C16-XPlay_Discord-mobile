import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';


import { styles } from './style';
import { theme } from '../../global/styles/theme';

type Props = {
    title: string;
    action?: ReactNode; //action is optional: some screens an item will render, others not
}


export function Header({title, action}: Props) {

    const navigation = useNavigation();

    const { secondary100, secondary40, heading } = theme.colors;

    function handleGoBack() {
        navigation.goBack();
    }

  return (
    
        <LinearGradient 
            style={styles.container}
            colors={[ secondary100, secondary40 ]}
        >      
        {/* buttons without text nor background, good for just an icon */}
            <BorderlessButton
                onPress={handleGoBack}
            > 
                <Feather
                    name='arrow-left' 
                    size={24}
                    color={heading}
                />
            </BorderlessButton>

            <Text style={styles.title}>
                { title }
            </Text>

            { action ? //action = icon (there is always a View, centralizing text wether there is icon or not)
                <View>
                    { action }
                </View> 
                :
                <View style={{width: 24}}/>

            }

        </LinearGradient>

  );
}
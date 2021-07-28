import React from 'react';
import { View, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';



import { theme } from '../../global/styles/theme';

import { styles } from './style';

type Props = RectButtonProps & {
    title: string;
    icon: React.FC<SvgProps>;  //turning prop icon into component Icon
    hasCheckBox?: boolean;
    checked?: boolean; 
}
//CategorySelect Home will not render little check mark on top right of element, so created hasCheckBox=false  
export function Category({
    title,
    icon: Icon, //components name start with upercase
    hasCheckBox = false,
    checked = false,
    ...rest  //include all other props coming from RectButtonProps
    }: Props) { 

    const { secondary40, secondary50, secondary70, secondary85 } = theme.colors;

    return (
       <RectButton {...rest}>
              <LinearGradient //LinearGradient will make button half bottom darker 70, half top lighter 50
                style={styles.container} //1º LinearGrad will style cards background color 
                colors={[ secondary50, secondary70 ]}
            >
                {/* card content, on top of LinearGradiet above */}
                <LinearGradient   //2º LinearGrad will style cards opacity, and changes backgroundcolor
                    style={[ styles.content, { opacity: checked ? 1 : 0.5}]}
                    colors={[ checked ? secondary85 : secondary50, secondary40 ]}

                >
                    { hasCheckBox &&
                        <View style={checked ? styles.checked : styles.check} /> 
                    }
                    <Icon 
                        width={48} 
                        height={48} 
                    />

                    <Text style={styles.title}>
                        { title }
                    </Text>
                </LinearGradient>
                
            </LinearGradient>
        
        </RectButton>
    );
}

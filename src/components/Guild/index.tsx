import React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import { theme } from '../../global/styles/theme';

import { GuildIcon } from '../GuildIcon';

export type GuildProps = {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}

type Props = TouchableOpacityProps & {
    data: GuildProps;
}
//component for Guilds rendering, used in screen Guild -FlatList 
export  function Guild({ data, ...rest }: Props) {



  return (
    <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        {...rest}
    >
        <GuildIcon guildId={data.id} iconId={data.icon}/>

        <View  style={styles.content}>
            <View>        
                <Text style={styles.title}>
                    {data.name}
                </Text>

                <Text style={styles.type}>
                    {data.owner ? 'Admin' : 'Guest'}
                </Text>

            </View>
        </View>

        <Feather 
            name={'chevron-right'}
            size={24}
            color={theme.colors.heading}
        />

    </TouchableOpacity>
  );
}
import React from 'react';

import { View, Text, Image } from 'react-native';

import { Avatar } from '../Avatar';


import { styles } from './style';
import { theme } from '../../global/styles/theme';

export type MemberProps = {
    id: string;
    username: string;
    avatar_url: string;
    status: string
}

type Props = {
    data: MemberProps;
}

export  function Member({ data }: Props) {

    const isOnline = data.status === 'online';

    const { on, primary } = theme.colors;

  return (
    <View style={styles.container}>
        <Avatar urlImage={data.avatar_url}/>

        <View>
            <Text style={styles.title}>
                {data.username}
            </Text>

            <View style={styles.status}>

                <View style={[
                    styles.bulletStatus,
                    {
                        backgroundColor: isOnline ? on : primary
                    }
                ]}/> 

                <Text style={styles.nameStatus}>
                    {isOnline ? "Available" : "Busy"}
                </Text>               

            </View>
        </View>
        
    </View>
  );
}
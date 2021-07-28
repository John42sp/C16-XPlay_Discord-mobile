import React, { useState} from 'react';
import { Fontisto } from '@expo/vector-icons'; //Fontisto: lib withing expo vector icons
import { View, Text, ImageBackground, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';


import { styles } from './style';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';
import { ListDivider } from '../../components/ListDivider';
import { Member } from '../../components/Members';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Guild, GuildProps } from '../../components/Guild';
import { Load } from '../../components/Load';

import { Image } from 'react-native';
import { api } from '../../services/api';
import { useEffect } from 'react';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}

//when modal opens, it renders FlatList below with all user's guilds 
export  function Guilds({handleGuildSelect}: Props) {
    //used static values to render guilds for testing screen
    // const guilds = [ 
    //     {
    //         id: '1',
    //         name: 'Legends',
    //         icon: 'image.png',
    //         owner: true
    //     },
    //     {
    //       id: '2',
    //       name: 'Angels',
    //       icon: 'image2.png',
    //       owner: true
    //   }
    // ]

    //picking guilds from discord endpoint: docs OAuth2 Scoopes (users/@me/guilds) to return actual guilds
    const [ guilds, setGuilds ] = useState<GuildProps[]>([]);
    const [ loading, setLoading ] = useState(true); //getting data from discord server may take a whaile = loading

    async function fetchGuilds() {
      const response = await api.get('/users/@me/guilds');
      setGuilds(response.data);
      setLoading(false);
    }

    useEffect(() => {
      fetchGuilds();
    },[]);


  return (
    <View style={styles.container}>

        { 
          loading ? <Load /> :
          
          <FlatList 
              data={guilds}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Guild //component made with TouchableOpacity button as a select prop on every item of list guilds
                  data={item}
                  onPress={() => handleGuildSelect(item)}
                /> 
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              ListHeaderComponent={() => <ListDivider isCentered />}
              contentContainerStyle={{ paddingBottom: 69, paddingTop: 104 }}
              style={styles.guilds}
              showsVerticalScrollIndicator={false}
          />
        }

    </View>





  );
}
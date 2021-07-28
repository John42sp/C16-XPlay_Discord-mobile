import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons'; //Fontisto: lib withing expo vector icons
import { View, Text, ImageBackground, FlatList, Alert, Share, Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';

import BannerImg from '../../assets/banner.png';

import { styles } from './style';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Member, MemberProps } from '../../components/Members';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointments';
import { Load } from '../../components/Load'; //all screens will have same 50top/50bottom colors


type GuildSelected = {
    guildSelected: AppointmentProps;
}

type GuildWidget = { //getting props from a discord server generated widget (C5:1hr36)
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}
//this screen renders 2 things: title and description from guildSelected, and discord members(players) who are
//either busy or available in the server

export  function AppointmentDetails() {
    const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget); //telling the widget state is object
    const [ loading, setLoading ] = useState(true);

    const routes = useRoute(); //to recover values from  parameters passed in this function, screen Home

    const { guildSelected } = routes.params as GuildSelected; //recovering guildSelected from Home

    // get info from discord about players:

    async function fetchGuildWidget() {
        try {       //1º create a widget/event (card) in discord server yourself, than pull info from it:
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);//createddiscord card
            // console.log(response.data)
            setWidget(response.data); 
            setLoading(false)
        } catch {
            Alert.alert("Error: Check server configurations. Maybe your widget not available?")
        } finally {
            setLoading(false) //either way it went through or not, finally stop the 'loading' 
        }
    }
//share server invitation: discord will not allow to share servers/guilds created that s not yourself the owner:
    async function handleShareInvitation() { //not owner = instant_invite: null -> so made button disapear
        const message = Platform.OS === 'ios'   
        ? `Join the ${guildSelected.guild.name}`  
        : widget.instant_invite ;

        Share.share({
            message,
            url: widget.instant_invite
        });

        
    }
//instant_invite: a widget prop with url as value, allowing invitation (get in)
    function handleOpenGuild() { 
        Linking.openURL(widget.instant_invite)
    }

    useEffect(() => {
        fetchGuildWidget();
    },[]);

    // const members = [
    //     {
    //         id: '1',
    //         username: 'Robert',
    //         avatar_url: 'https://github.com/john42sp.png',
    //         status: 'online'
    //     },
    //     {
    //         id: '2',
    //         username: 'Paul',
    //         avatar_url: 'https://github.com/john42sp.png',
    //         status: 'offline'
    //     },

    // ]

    // const members = {
    //     id: data.id,
    //     guild: {
    //         id: data.guild.id,
    //         name: data.guild.name,
    //         icon: data.guild.icon,
    //         owner: data.guild.owner,
    //     },
    //     category: data.category,
    //     date: data.date,
    //     description: data.description
    // }

  return (
      <Background>
        <Header
            title="Details"
            action={
                guildSelected.guild.owner && //make share button disapear in case user is not available 

                <BorderlessButton onPress={handleShareInvitation}>
                    <Fontisto 
                        name="share"
                        size={24}
                        color={theme.colors.primary}
                    />
                </BorderlessButton>
                
            }
        />

        <ImageBackground 
            source={BannerImg}
            style={styles.banner}
        >
            <View style={styles.bannerContent}>
                <Text  style={styles.title}>
                    {guildSelected.guild.name}
                </Text>

                <Text style={styles.subtitle}>
                    {guildSelected.description}
                </Text>
            </View>

        </ImageBackground>

    {
        loading ? <Load /> :
//2 elements must be wrapped by fregment <> </>
        <> 
            <ListHeader 
                title="Players"
                subtitle={`Total ${widget.presence_count}`}
            />

            <FlatList 
                data={widget.members}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                <Member 
                    data={item}
                    
                /> 
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                style={styles.membersList}
                showsVerticalScrollIndicator={false}
            />
        </>
    }
{/* //footer created just to manipulatethe button lateral spacing */}
        {guildSelected.guild.owner &&    //discord only gives instant_invite to owners, so guests can t get in
            <View style={styles.footer}> 
                <ButtonIcon 
                    title="Enter the match"
                    onPress={handleOpenGuild}
                />
            </View>
        }

      </Background>





  );
}
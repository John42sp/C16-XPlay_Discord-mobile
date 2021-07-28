import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RectButton } from 'react-native-gesture-handler';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'; //Fontisto: lib withing expo vector icons

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components//TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { GuildProps } from '../../components/Guild';

import { Guilds } from '../Guilds'; //from screen Guilds =  modal content 

import { styles } from './style';
import { theme } from '../../global/styles/theme';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';


export  function AppointmentCreate() {

  const [ category, setCategory ] = useState('');
  const [ openGuildsModal, setOpenGuildsModal ] = useState(false);
  const [ guild, setGuild ] = useState<GuildProps>({} as GuildProps); 
  //guild state is type GuildProps, and starts as empty object with  GuildProps

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

    const navigation = useNavigation(); 

  function handleOpenGuilds() {
      setOpenGuildsModal(true)
  }

  function handleCloseModal() {
    setOpenGuildsModal(false)
}

  function handleGuildsSelect(guildSelect: GuildProps) {
      setGuild(guildSelect);
      setOpenGuildsModal(false);
  }

  function handleCategorySelect( categoryId: string) {
     setCategory(categoryId)
  }

  async function handleSave() {
    const newAppointment = {
        id: uuid.v4(),
        guild,
        category,
        date: `${day}/${month} às ${hour}:${minute}h`,
        description
    }  

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    //TO NOT OVERRIDE APPOINTMENTS ALREADY SAVED, MAKE VERIFICATION
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
        COLLECTION_APPOINTMENTS,
        JSON.stringify([...appointments, newAppointment])
        );
    
        navigation.navigate('Home');
  }

  return (
      <KeyboardAvoidingView //screen push up effect not working
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ios: 80, android: 500})}
      >
        <ScrollView>
            <Background>
                <Header
                    title="Match scheduling"
                />

                <Text style={[styles.label, {marginTop: 36, marginBottom: 18,  marginLeft: 24}]}>
                    Category
                </Text>

            <CategorySelect 
                hasCheckBox
                // setCategory={setCategory}//changed! instead of passing the state, passing the function (C3,30m)
                setCategory={handleCategorySelect}
                categorySelected={category}
            />

            <View style={styles.form}> 
                <RectButton onPress={handleOpenGuilds}>
                    <View style={styles.select}>
                        {
                            guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image}/>
                            
                        }

                        <View style={styles.selectBody}>
                            <Text style={styles.label}>
                                { guild.name ? guild.name : "Select a server"}
                            </Text>

                        </View>

                        <Feather
                            name="chevron-right"
                            size={18}
                            color={theme.colors.heading}
                        />

                    </View>
                </RectButton>

                <View style={styles.field}>
                    <View>
                        <Text style={styles.label}>
                            Day & month
                        </Text>  

                        <View style={styles.column}>
                            <SmallInput  
                                maxLength={2} 
                                onChangeText={setDay}
                            />   

                            <Text style={styles.divider}>
                                /
                            </Text>           

                            <SmallInput  
                                maxLength={2} 
                                onChangeText={setMonth}
                            />                     
                        
                        </View>              
                    </View>

                    <View>
                        <Text style={styles.label}>
                            Hour & minute
                        </Text>  

                        <View style={styles.column}>
                            <SmallInput  
                                maxLength={2} 
                                onChangeText={setHour}
                            />   

                            <Text style={styles.divider}>
                                :
                            </Text>           

                            <SmallInput  
                                maxLength={2} 
                                onChangeText={setMinute}
                            />                     
                        
                        </View>              
                    </View>

                </View>

            <View style={[styles.field, { marginBottom: 12}]}>
                    <Text style={styles.label}>
                        Description
                    </Text>

                    <Text style={styles.caracteresLimt}>
                        Max. 100 characters
                    </Text>
            </View>
                
                <TextArea 
                    multiline
                    maxLength={100}
                    numberOfLines={5}
                    autoCorrect={false}
                    onChangeText={setDescription}

                />

                <View style={styles.footer}>
                    <Button //Button brings props 'title', and RectButtonProps (...rest)
                        title="Book"
                        onPress={handleSave}
                    />
                </View>

            </View>

            </Background>
        </ScrollView>
        
{/* children prop in ModalView component is 'screen' Guilds wrapped here */}
{/* Through prop and function 'handleGuildSelect' from Guilds screen, selected 'guild' is set on state here */}
        <ModalView 
            visible={openGuildsModal}
            closeModal={handleCloseModal}
        >  
            <Guilds  handleGuildSelect={handleGuildsSelect} />
        </ModalView>

      </KeyboardAvoidingView>




  );
}
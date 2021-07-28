import React, { useCallback, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { FlatList } from 'react-native-gesture-handler';
import { Appointment, AppointmentProps } from '../../components/Appointments';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background'; //all screens will have same 50top/50bottom colors
import { Load } from '../../components/Load'; //all screens will have same 50top/50bottom colors


import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { useEffect } from 'react';

//Home componente received CategorySelect component with 'categories' map, which received Category component to render every category



export  function Home() {

  const navigation = useNavigation();

  const [ category, setCategory ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ appointments, setAppointments ] = useState<AppointmentProps[]>([]); //starts empty array, then arr Apps

  async function loadAppointments(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    
    
    if(category){ //if a category selected, render appointments according to selected category
      setAppointments(storage.filter(item => item.category === category))
    } else { //else  no category selected, render all appointments
      setAppointments(storage)
    }
    setLoading(false);
  }
//useEffect: good for memorize state
//useFocusEffect: good to render a list after a navigation / screen redirect
//useCallback: good to memorize function

useFocusEffect(useCallback(() => { //good togo back to screen e reload items again
  loadAppointments();
},[category])); //dependency category: everytime select category, reload list


  // const appointments = [
  //   {
  //     id: '1',
  //     guild: {
  //       id: '1',
  //       name: 'Legends',
  //       icon: null,
  //       owner: true,
  //     },
  //     category: '1',
  //     date: '06/22 at 08:40 pm',
  //     description: 'Today we will get to the challenger without losing a single match!'
  //   },
  //   {
  //     id: '2',
  //     guild: {
  //       id: '1',
  //       name: 'Legends',
  //       icon: null,
  //       owner: true,
  //     },
  //     category: '1',
  //     date: '06/22 at 08:40 pm',
  //     description: 'Today we will get to the challenger without losing a single match!'
  //   }
  // ]


  //apply a toogle effect (select x deselect) catogory button 
  function handleCategorySelect( categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }
//in screen Appointment Details, selected appointment can be recovered
  function handleAppointmentDetails(guildSelected: AppointmentProps) { //
    navigation.navigate('AppointmentDetails', {guildSelected: guildSelected} )
  }
//will only be able to share (use discord 'instant_invite) if user is guild / server owner himself
  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }


  return (//component Background on all screens, for LinearGradient effect
    <Background> 
          
        <View style={ styles.header}>
            <Profile />
            <ButtonAdd 
              onPress={handleAppointmentCreate}
            />
        </View>

  {/* //component to render horizontal list of categorie items, where it received prop categorySelecte */}       
          <CategorySelect  
            categorySelected={category}
            setCategory={handleCategorySelect}
            //hasCheckBox={true} //hasChecked //defined as false on CategorySelect and Category components
          />      

    {
      loading ? <Load /> :

      <>
          <ListHeader 
            title="Scheduled matches"
            subtitle={`Total ${appointments.length}`}
          />        

{/* Flatlist instead of  ScrollView: more performace for large number of items, gives more enphasis to items being rendered on screen, it receives the props bellow: */}
          <FlatList //vertical list of appointments(user clicks on each and will be redirected to its details)
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Appointment //Component Appointment renders every item in FlatList,received GuildIcon component
                data={item}
                  // onPress={handleAppointmentDetails} //just navigates to another screen
                  onPress={() => handleAppointmentDetails(item)}//navigates to another screen with  selected item
              /> 
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
      </>
    }

    </Background>
  );
}
import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';

import { styles } from './style';
import { theme } from '../../global/styles/theme';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { GuildProps } from '../Guild';
import { GuildIcon } from '../../components/GuildIcon';
import { categories } from '../../utils/categories';
import { LinearGradient } from 'expo-linear-gradient';


//export to also be used elsewhere
export type AppointmentProps = {
    id: string;
    guild: GuildProps;
    category: string;
    date: string;
    description: string;
}

type Props = RectButtonProps & {
    data: AppointmentProps
}
//Props contains data + RectButtonProps( as ...rest)
export  function Appointment({ data, ...rest }: Props ) {
//filter collection of all categories which their id is equal to data.category
    const [ category ] = categories.filter(item => item.id === data.category); //class2: 2.15 mnts
    const { owner } = data.guild;
    const { primary, on, secondary50, secondary70 } = theme.colors;
  return (
      <RectButton {...rest}>     
        <View style={styles.container}>
            <LinearGradient
                style={styles.guildIconContainer}
                colors={[ secondary50, secondary70 ]}
            >
                {/* GuildIcon to be used in other places, so creating an image as component  */}
                <GuildIcon guildId={data.guild.id} iconId={data.guild.icon}/>
            </LinearGradient>


            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {data.guild.name}
                    </Text>

                    <Text style={styles.category}>
                        { category.title } 
                    </Text>
                </View>

                <View style={styles.footer}>
                    <View style={styles.dateInfo}>
                        <CalendarSvg />
                        <Text style={styles.date}>
                            { data.date }

                        </Text>

                    </View>              

{/* fill = inside color of object svg prop  Need to check if fill prop is not defined in svg file itself*/}
                <View style={styles.playersInfo}>
                    <PlayerSvg fill={ owner ? primary : on } /> 

                    <Text style={[ styles.player, 
                    { color: owner ? primary : on }
                    ]}>
                        { owner ? 'Host' : 'Visitor' } 
                    </Text>

                </View>
              </View>
            </View>

        </View>

      </RectButton>




  );
}
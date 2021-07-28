import React from 'react';

import { Image, View } from 'react-native';
import DiscordSvg from '../../assets/discord.svg';
import { styles } from './style';

const { CDN_IMAGE } = process.env;

//discord keeps image separeted in a CDN,so need to pass image hash + .png
type Props = {
   guildId: string;
   iconId: string | null;
}


//Props contains data + RectButtonProps( as ...rest)
export  function GuildIcon({guildId, iconId }:Props) {
   //  const uri = "https://usa.governmentjobswork.com/wp-content/uploads/sites/2/2020/11/Discord.png";  
    //from discord icon png
   //changing static icon image to dynamic 
   const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

  return (
   <View style={styles.container}>
      { iconId ?
         <Image 
         source={{ uri }}
         style={styles.image}
         resizeMode="cover" //to adjust image proportionally in case it does not fit correctly
      /> : <DiscordSvg 
            width={40}
            height={40}
         />
      }
   </View>




  );
}
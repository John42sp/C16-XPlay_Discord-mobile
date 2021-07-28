import React from 'react';
import { Text, View, Image, SafeAreaView, Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';
import  IllustrationImg from '../../assets/illustration.png';

import { styles } from './styles';

import { ButtonIcon } from "../../components/ButtonIcon";
// import { useNavigation } from '@react-navigation/native';
import { Background } from '../../components/Background'; //all screens will have same 50top/50bottom colors 
import { ActivityIndicator } from 'react-native';
import { theme } from '../../global/styles/theme';


export function Signin() {

    // const [ text, setText ] = useState('');
    // const navigation = useNavigation();

    const { loading, signIn } = useAuth();
    // console.log(user)

    async function handleSignin() {
        // navigation.navigate("Home"); stoped using navigation after implementing context and signIn auth 
        // console.log('test')
        // Alert.alert('test test')

        //since shooting an exeption, use try/catch block
        try {
            await signIn()
        } catch (error) {
            Alert.alert(error)
        }

    }

  return (
      <Background>
        <View style={styles.container}>       
            {/* <Text>Hey there!</Text>          
            <TextInput 
                style={styles.input} 
                // onChangeText={(text) => console.log(text)}
                onChangeText={setText}
            />
            <Text>
                Voce digitou... {text}
            </Text> */}          

            <Image 
                source={IllustrationImg}
                style={styles.image}
                resizeMode="stretch"
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    Connect and {`\n`}
                    organize your{`\n`}
                    games 
                </Text>

                <Text style={styles.subtitle}>
                    Create groups to play your favorite{`\n`}
                    games with your bodies
                   
                </Text>

                {
                    loading ? 
                    <ActivityIndicator 
                        color={theme.colors.primary}
                    /> :
                    <ButtonIcon 
                        title="Sign in with Discord" 
                        // activeOpacity={0.7}
                        onPress={handleSignin}
                    /> 
                }    
            </View>   
        </View>
      </Background>





  );
}
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_USERS } from '../configs/database';

// const { SCOPE } = process.env; //
// const { CLIENT_ID } = process.env;
// const { CDN_IMAGE } = process.env;
// const { REDIRECT_URI } = process.env;
// const { RESPONSE_TYPE } = process.env;

import {
    REDIRECT_URI,
    SCOPE,
    RESPONSE_TYPE,
    CLIENT_ID,
    CDN_IMAGE
 } from '../configs';

type User = {
    id: string;
    username: string;
    firstName: string;  //in case username is too long, to use just first name instead
    avatar: string;
    email: string;
    token: string;
  }

  type AuthContextData = {
      user: User;
      loading: boolean;
      signIn: () => Promise<void>;
      signOut: () => Promise<void>;

  }

  type AuthProviderProps = {
      children: ReactNode;
  }

//there are some authentication strategies  setup ready to use: https://docs.expo.io/guides/authentication/
//here using AuthSession = handshaker identify who requested token, and give to the right person


  type AuthorizationResponse = AuthSession.AuthSessionResult & {
      params: {
        access_token?: string;
        error?: string; //in case user cancels in discord auth screen, to eliminate error screen (C5:23)  

      }

  }

export const AuthContext = createContext({} as AuthContextData); //it starts as an empty object

function AuthProvider({children}: AuthProviderProps) {

    const [ user, setUser ] = useState<User>({} as User);
    const [ loading, setLoading ] = useState(false); //it may take a while to signin


    async function signIn() {
    //using try/catch block because using external context, which may shoot an exception, and will avoid app from stop runing
        try {  
          setLoading(true); //in either case of 'success' or not, loading starts
            //redirecting url created by discord - variables with be replaced with user's own auth values:
          const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`; 

          //authUrl: where to take user for signin = authorization url:
          //https://discord.com/developers/applications/867023311740731452/oauth2, 
          //generating test (static) url in test environment : C4:1.09
          const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse; 
        //   console.log(response) returns object with type and params.access_token; 

        if(type === 'success' && !params.error) { //only proceed if success and no error
            //it neds a token to deliver infos. This way it inhects token in all requests:
            api.defaults.headers.authorization = `Bearer ${params.access_token}` //passing token to  headers

            // see discord docs: https://discord.com/developers/docs/resources/user#user-object
            const userInfo = await api.get('/users/@me');//once user logged in with his credentials
            console.log(userInfo); //brings large object with many props, need to pull just firstName
            
            const firstName = userInfo.data.username.split(' ')[0]; //separetes by spaces and take only first
            //discord avatars are hashed, so formating (reseting) it to its actuall png route:
            userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

            const userData = { //all user infos needed to set 'user' for oauth login 
                ...userInfo.data, //userInfo.data 
                firstName,       
                token: params.access_token,   //userInfo.params.access_token
            }

            await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))

            setUser( //setUser data filled with all necessary type props expected from user state 
               userData
            )

            // setLoading(false); //to stop loading after success is through 
        } 
        //     else {
        //     setLoading(false); ////to stop loading after not success is through as well
        // }
          
        } catch {
            throw new Error('Authentication not possible this time!')
        } finally {
            setLoading(false); //changed else and 2 setLoadings for finally
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);    
      }

    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USERS);

        if(storage) {
            const userLogged = JSON.parse(storage) as User;
            //now insert tokens in the requests (in the headers)
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

            setUser(userLogged);


        }
        
    }
    useEffect(() => { //seek data stored locally
        loadUserStorageData();
    },[]);



    // ATENTION: added scheme: "Xplay" prop to app.json file to deal with deep link redirecting
// console.log(user)
    return (
        <AuthContext.Provider
            value={{user, signIn, loading, signOut }} 
        >
            {children}

        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context;
}

export {
    useAuth,
    AuthProvider
}
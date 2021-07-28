
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { AppRoutes } from './app.routes';
import { Signin } from '../screens/Signin';



export function Routes(){
  const { user } = useAuth();

  return(  
        <NavigationContainer>
          {/* if there is logged in user, redirect him to AuthRouts, otherwise to Signin screen */}
            { user.id ? <AppRoutes /> : <Signin /> } 
            {/* <AuthRoutes /> */}
        </NavigationContainer>
    
  )
}
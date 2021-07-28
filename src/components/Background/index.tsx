import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './style';
import { theme } from '../../global/styles/theme';

type Props = {
  children: ReactNode;
}
//component created to give 'Linear Gradient' effect on every screeen
export function Background({ children }: Props) {
  const { secondary80, secondary100 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  )
}
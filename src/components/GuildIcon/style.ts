import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 61,
    height: 65,
    borderRadius: 8,
    backgroundColor: theme.colors.discord,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', //no passing the limits, image going over the border, so border will appear
  },
  image: {
    width: 61,
    height: 65,
  }

})
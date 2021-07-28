import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 234,
    // marginBottom: 15
    // justifyContent: 'flex-end' //it took both title and subtitle to the bottom as the banner children
  },
  bannerContent: { //bannerContent View will naturaly take some space starting top left, fex 1 will make it  
    flex: 1,        //use the entire banner (above) container, so justifyContent will take desired effect
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 30
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    lineHeight: 21
  },
  membersList: {
    marginLeft: 24,
    marginTop: 14
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 5,
    // marginBottom: getBottomSpace(),
  }

});
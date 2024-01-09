import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';
import Button from '@/components/Button';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { CText } from '@/components/CText';
import { FONTS } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
};

export const CityScreenHeader = ({ style, title }: Props) => {
  const navi = useNavigation();

  const isTitleExceed = title?.length >= 17;
  return (
    <View style={cn(styles.container, style)}>
      <Button style={styles.btn} onPress={navi.goBack}>
        <FontAwesome name="angle-left" size={30} color="white" />
      </Button>

      <CText
        style={{
          ...styles.title,
          lineHeight: isTitleExceed ? 30 : undefined,
        }}
        numberOfLines={2}
      >
        {title}
      </CText>

      {/*<Button style={cn(styles.btn, styles.hide)}>*/}
      {/*  <Feather name="search" size={22} color="white" />*/}
      {/*</Button>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    // position: 'absolute',
    alignItems: 'center',
    // top: CONSTANTS.spaces.paddingTop,
    zIndex: 10,
    // maxWidth: Dimensions.get('window').width,
  },
  btn: {
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.CrimsonBold,
    fontSize: 30,
    textAlign: 'center',
    marginHorizontal: 5,
    width: Dimensions.get('window').width - 120, // 40 + 40 - buttons + paddingHorizontal * 2 * 15 + marginHorizontal * 2 * 10
  },
  hide: {
    opacity: 0,
  },
});

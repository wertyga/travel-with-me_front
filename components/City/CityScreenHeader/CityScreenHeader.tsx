import { StyleSheet, View, ViewStyle } from 'react-native';
import Button from '@/components/Button';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { CText } from '@/components/CText';
import { FONTS } from '@/types';
import { useNavigation } from '@react-navigation/native';

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
};

export const CityScreenHeader = ({ style, title }: Props) => {
  const navi = useNavigation();

  return (
    <View style={cn(styles.container, style)}>
      <Button style={styles.btn} onPress={navi.goBack}>
        <FontAwesome name="angle-left" size={30} color="white" />
      </Button>

      <CText style={styles.title}>{title}</CText>

      <Button style={cn(styles.btn, styles.hide)}>
        <Feather name="search" size={22} color="white" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
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
    flexGrow: 1,
    textAlign: 'center',
  },
  hide: {
    opacity: 0,
  },
});

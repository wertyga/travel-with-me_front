import { Linking, StyleSheet, View, useWindowDimensions } from 'react-native';

import RenderHtml from 'react-native-render-html';

import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';

import { CText } from '@/components/CText';

import { City, FONTS } from '@/types';

type Props = {
  security: City['security'];
};

export const CityScreenMetaDHSTSecurity = ({ security }: Props) => {
  const { width } = useWindowDimensions();

  const onCall = (tel: string) => () => {
    Linking.openURL(`tel:${tel}`);
  };

  const {
    overview,
    emergency: { police, fireDepartment, ambulance },
  } = security;

  return (
    <View>
      <View style={styles.security}>
        {!!police && (
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="police-badge-outline"
              size={24}
              color="white"
            />
            <CText onPress={onCall(police)} style={styles.rowText}>
              {police}
            </CText>
            <AntDesign name="phone" size={12} color="white" />
          </View>
        )}
        {!!fireDepartment && (
          <View style={styles.row}>
            <SimpleLineIcons name="fire" size={24} color="white" />
            <CText onPress={onCall(fireDepartment)} style={styles.rowText}>
              {fireDepartment}
            </CText>
            <AntDesign name="phone" size={12} color="white" />
          </View>
        )}
        {!!ambulance && (
          <View style={styles.row}>
            <FontAwesome name="ambulance" size={24} color="white" />
            <CText onPress={onCall(ambulance)} style={styles.rowText}>
              {ambulance}
            </CText>
            <AntDesign name="phone" size={12} color="white" />
          </View>
        )}
      </View>
      <View style={{ paddingTop: 10 }}>
        <RenderHtml
          source={{ html: overview }}
          contentWidth={width}
          baseStyle={htmlStyles.base}
          tagsStyles={htmlStyles.tags}
        />
      </View>
    </View>
  );
};

const htmlStyles = {
  base: { color: 'white', fontSize: '16px', lineHeight: 22 },
  tags: {
    p: {
      margin: 0,
    },
    h3: {
      margin: 0,
    },
    h2: {
      margin: 0,
    },
  },
};

const styles = StyleSheet.create({
  security: {
    flexDirection: 'row',
  },
  overview: {
    marginTop: 15,
    height: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginRight: 15,
  },
  rowText: {
    marginLeft: 5,
    marginRight: 5,
  },
});

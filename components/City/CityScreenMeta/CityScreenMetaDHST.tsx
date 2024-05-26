import { useMemo } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CText } from '@/components/CText';
import { City } from '@/types';

type Props = {
  type: 'Description' | 'History' | 'Security' | 'Transport';
  city: City;
};

export const CityScreenMetaDHST = ({ type, city }: Props) => {
  const onCall = (tel: string) => () => {
    Linking.openURL(`tel:${tel}`);
  };

  const onApp = (link: string) => () => {
    Linking.openURL(link);
  };

  const Component = useMemo(() => {
    if (type === 'Description') {
      return <CText>{city.description}</CText>;
    }

    if (type === 'History') {
      return <CText>{city.history}</CText>;
    }

    if (type === 'Security') {
      if (!city.security) return null;

      const {
        overview,
        emergency: { police, fireDepartment, ambulance },
      } = city.security;
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
          <CText style={styles.overview}>{overview}</CText>
        </View>
      );
    }

    if (type === 'Transport') {
      if (!city.transport) return null;

      const { overview, apps } = city.transport;
      const filteredApps = apps.filter(app => !!app.link && !!app.name);

      return (
        <View>
          <CText style={styles.overview}>{overview}</CText>

          <ScrollView
            style={styles.apps}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {filteredApps.map(({ name, link, description }) => {
              return (
                <View style={styles.row} key={name}>
                  <Entypo name="google-play" size={24} color="white" />

                  <CText onPress={onApp(link)} style={styles.rowText}>
                    {name}
                  </CText>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }

    return null;
  }, [type]);

  return Component;
};

const styles = StyleSheet.create({
  security: {
    flexDirection: 'row',
  },
  apps: {
    marginTop: 20,
  },
  overview: {
    marginTop: 15,
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

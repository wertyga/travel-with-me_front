import { useMemo } from 'react';

import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { CityScreenMetaDHSTSecurity } from '@/components/City/CityScreenMeta/CityScreenMetaDHST/CityScreenMetaDHSTSecurity';

import { City } from '@/types';

type Props = {
  type: 'Description' | 'History' | 'Security' | 'Transport';
  city: City;
};

export const CityScreenMetaDHST = ({ type, city }: Props) => {
  const onApp = (link: string) => () => {
    Linking.openURL(link);
  };

  const Component = useMemo(() => {
    if (type === 'Description') {
      return <CText light>{city.description}</CText>;
    }

    if (type === 'History') {
      return <CText light>{city.history}</CText>;
    }

    if (type === 'Security') {
      if (!city.security) return null;

      return <CityScreenMetaDHSTSecurity security={city.security} />;
    }

    if (type === 'Transport') {
      if (!city.transport) return null;

      const { overview, apps } = city.transport;
      const filteredApps = apps.filter(app => !!app.link && !!app.name);

      return (
        <View>
          <CText style={styles.overview} light>
            {overview}
          </CText>

          <ScrollView
            style={styles.apps}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {filteredApps.map(({ name, link }) => {
              return (
                <Button style={styles.row} key={name} outlined>
                  <Entypo name="google-play" size={24} color="white" />

                  <CText onPress={onApp(link)} style={styles.rowText} light>
                    {name}
                  </CText>
                </Button>
              );
            })}
          </ScrollView>
        </View>
      );
    }

    return null;
  }, [type, city]);

  return Component;
};

const styles = StyleSheet.create({
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

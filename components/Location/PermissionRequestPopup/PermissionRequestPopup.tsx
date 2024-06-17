import { StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { useStores } from '@/hooks';
import { CONSTANTS } from '@/styles/constants';

export const PermissionRequestPopup = () => {
  const {
    isRequestLocationPopupShown,
    onStartWatchingLocation,
    setIsRequestLocationPopupShown,
    locationWatchingCallback,
  } = useStores(stores => ({
    isRequestLocationPopupShown:
      stores.locationStore.isRequestLocationPopupShown,
    onStartWatchingLocation: stores.locationStore.onStartWatchingLocation,
    locationWatchingCallback: stores.locationStore.locationWatchingCallback,
    setIsRequestLocationPopupShown:
      stores.locationStore.setIsRequestLocationPopupShown,
  }));

  if (!isRequestLocationPopupShown) {
    return null;
  }

  const handleDeny = () => {
    setIsRequestLocationPopupShown(false);
  };

  const handleGrant = async () => {
    setIsRequestLocationPopupShown(false);
    await onStartWatchingLocation(locationWatchingCallback);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.pointWrapper}>
          <FontAwesome5
            name="map-marked-alt"
            size={36}
            color={CONSTANTS.colors.bg3}
          />
        </View>
        <CText style={styles.title}>Access to your location</CText>
        <CText style={styles.text}>
          We need to access your location to activate the tour guide feature
          that will take you through the entire guide
        </CText>

        <View style={styles.actions}>
          <Button high style={styles.action} onPress={handleDeny}>
            DENY
          </Button>
          <Button high style={styles.action} onPress={handleGrant}>
            GRANT
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    backgroundColor: CONSTANTS.colors.bg3,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    marginBottom: 30,
  },
  text: {
    color: 'white',
  },
  pointWrapper: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  action: {
    width: '30%',
    fontSize: 18,
  },
});

export default observer(PermissionRequestPopup);

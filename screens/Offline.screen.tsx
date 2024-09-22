import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';

import { SCREENS } from '@/types';

import NoConnectionsImage from '@/assets/images/no_connection.png';

const OfflineScreen = () => {
  return (
    <MainLayout
      bgImage={NoConnectionsImage}
      noFooter
      headerTitle="Internet Connection failed"
      withBackButton
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button href={SCREENS.CitiesList} high fluid filled>
        Reload
      </Button>
    </MainLayout>
  );
};

export default observer(OfflineScreen);

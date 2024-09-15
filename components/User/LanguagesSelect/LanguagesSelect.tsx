import { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import LanguagesSelectList from '@/components/User/LanguagesSelect/LanguagesSelectList';
import { useModal, useStores } from '@/hooks';

export const LanguagesSelect = () => {
  const { toggleShow, createModal } = useModal();

  const { userLanguages } = useStores(stores => {
    return {
      userLanguages: stores.userStore.user?.languages || [],
    };
  });

  useEffect(() => {
    createModal(<LanguagesSelectList />);
  }, []);

  return (
    <Button high onPress={toggleShow} style={styles.container}>
      {!userLanguages.length && <CText>Choose your language</CText>}
      {!!userLanguages.length && <CText>Languages:</CText>}

      {userLanguages.slice(0, 3).map(({ language, flag }) => {
        return (
          <CText key={language} style={styles.buttonContent}>
            {flag}
          </CText>
        );
      })}
      {userLanguages.length > 3 && <CText>...</CText>}
    </Button>
  );
};

export default observer(LanguagesSelect);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    gap: 8,
  },
});

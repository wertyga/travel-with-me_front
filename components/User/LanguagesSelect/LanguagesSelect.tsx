import { useState } from 'react';

import { StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Modal } from '@/components/Common/Modal/Modal';
import LanguagesSelectList from '@/components/User/LanguagesSelect/LanguagesSelectList';
import { useStores } from '@/hooks';

export const LanguagesSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userLanguages } = useStores(stores => {
    return {
      userLanguages: stores.userStore.user?.languages || [],
    };
  });

  return (
    <>
      <Button
        high
        onPress={() => {
          setIsOpen(!isOpen);
        }}
        style={styles.container}
      >
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

      <Modal
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        title="Choose your languages"
      >
        <LanguagesSelectList />
      </Modal>
    </>
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

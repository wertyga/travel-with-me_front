import { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Modal } from '@/components/Common/Modal/Modal';
import LanguagesSelectList from '@/components/User/LanguagesSelect/LanguagesSelectList';
import { useStores } from '@/hooks';

import { Language } from '@/types/user';

export const LanguagesSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userLanguages, isNetConnected, languagesList, fetchUpdateUser } =
    useStores(stores => {
      return {
        userLanguages: stores.userStore.user?.languages || [],
        isNetConnected: stores.appStateStore.isNetConnected,
        languagesList: stores.userStore.languages || [],
        fetchUpdateUser: stores.userStore.fetchUpdateUser,
      };
    });

  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [isChanged, setIsChanged] = useState(false);

  const toggleSelectLanguage = async (lang: Language, isIncluded: boolean) => {
    if (isIncluded) {
      setSelectedLanguages(
        selectedLanguages.filter(({ language }) => {
          return language !== lang.language;
        })
      );
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleCloseModal = async () => {
    setIsOpen(false);

    if (isChanged) {
      await fetchUpdateUser({ languages: selectedLanguages });
    }
  };

  const onReset = () => {
    setSelectedLanguages(userLanguages);
  };

  useEffect(() => {
    setSelectedLanguages(userLanguages);
  }, [userLanguages]);

  useEffect(() => {
    let hasChanged = false;

    if (selectedLanguages.length !== userLanguages.length) {
      hasChanged = true;
    } else {
      hasChanged = !!userLanguages.find(({ language: userLanguage }) => {
        return !selectedLanguages.find(
          ({ language }) => userLanguage !== language
        );
      });
    }

    setIsChanged(hasChanged);
  }, [selectedLanguages, userLanguages]);

  return (
    <>
      <Button
        high
        onPress={() => {
          setIsOpen(!isOpen);
        }}
        style={styles.container}
        disabled={!isNetConnected}
      >
        {!userLanguages.length && <CText light>Choose your language</CText>}
        {!!userLanguages.length && <CText light>Languages:</CText>}

        {userLanguages.slice(0, 3).map(({ language, flag }) => {
          return (
            <CText key={language} style={styles.buttonContent} light>
              {flag}
            </CText>
          );
        })}
        {userLanguages.length > 3 && <CText light>...</CText>}
      </Button>

      <Modal
        visible={isOpen}
        onClose={handleCloseModal}
        title="Choose your languages"
      >
        <LanguagesSelectList
          onChange={toggleSelectLanguage}
          languagesList={languagesList}
          selectedLanguages={selectedLanguages}
          isChanged={isChanged}
          onReset={onReset}
        />
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

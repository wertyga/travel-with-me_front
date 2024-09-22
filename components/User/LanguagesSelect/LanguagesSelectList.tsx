import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { useStores } from '@/hooks';

import { Language } from '@/types/user';

import { CONSTANTS } from '@/styles/constants';

const LanguagesSelectList = () => {
  const { languagesList, updateUser, userLanguages } = useStores(stores => {
    return {
      languagesList: stores.userStore.languages,
      userLanguages: stores.userStore.user?.languages || [],
      updateUser: stores.userStore.updateUser,
    };
  });

  const toggleSelectLanguage = (lang: Language) => {
    const payload = {
      languages: userLanguages,
    };

    const isExists = payload.languages.find(({ language: userLang }) => {
      return userLang === lang.language;
    });

    if (isExists) {
      payload.languages = payload.languages.filter(
        l => l.language !== lang.language
      );
    } else {
      payload.languages = [...payload.languages, lang];
    }

    updateUser(payload);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {languagesList.map((lang, i) => {
        const isIncluded = userLanguages.find(({ language: userLang }) => {
          return userLang === lang.language;
        });

        return (
          <TouchableOpacity
            key={`${lang.language}-${i}`}
            style={styles.item}
            onPress={() => toggleSelectLanguage(lang)}
          >
            {isIncluded && <Feather name="check" size={20} color="white" />}
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <CText light>{lang.flag}</CText>
              <CText light>{lang.language}</CText>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default observer(LanguagesSelectList);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
  },
  content: {
    paddingTop: 15,
    gap: 15,
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    gap: 15,
  },
});

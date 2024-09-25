import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';

import { Language } from '@/types/user';

type Props = {
  onChange: (language: Language, isIncluded: boolean) => void;
  selectedLanguages: Language[];
  languagesList: Language[];
  isChanged: boolean;
  onReset: () => void;
};

const LanguagesSelectList = ({
  onChange,
  languagesList,
  selectedLanguages,
  isChanged,
  onReset,
}: Props) => {
  return (
    <View style={styles.container}>
      {isChanged && (
        <Button light high onPress={onReset}>
          Reset
        </Button>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
      >
        {languagesList.map((lang, i) => {
          const isIncluded = !!selectedLanguages.find(
            ({ language: userLang }) => {
              return userLang === lang.language;
            }
          );

          return (
            <TouchableOpacity
              key={`${lang.language}-${i}`}
              style={styles.item}
              onPress={() => onChange(lang, isIncluded)}
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
    </View>
  );
};

export default observer(LanguagesSelectList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
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

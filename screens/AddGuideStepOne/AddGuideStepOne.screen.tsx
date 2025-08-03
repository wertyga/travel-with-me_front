import { MainLayout } from '@/Layouts';
import { useAuthGuard, useNavigation } from '@/hooks';

import { SCREENS } from '@/types';

import {
  AddGuideMetaForm,
  TAddGuideMetaFormProps,
} from './components/MetaForm';

const AddGuideStepOneScreen = () => {
  useAuthGuard();

  const navigation = useNavigation();

  const onSubmit: TAddGuideMetaFormProps['onSubmit'] = data => {
    navigation.navigate(SCREENS.AddGuideMap, data);
  };

  return (
    <MainLayout headerTitle="Create my guide">
      <AddGuideMetaForm onSubmit={onSubmit} />
    </MainLayout>
  );
};

export default AddGuideStepOneScreen;

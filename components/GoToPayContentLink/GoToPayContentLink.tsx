import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import Button, { CustomButtonProps } from '@/components/Button';
import { useNavigation, useStores } from '@/hooks';
import { SCREENS } from '@/types';

type Props = Omit<CustomButtonProps, 'onPress' | 'href'> & {};

export const GoToPayContentLinkComponent = ({
  children,
  hrefParams,
  ...btnProps
}: Props) => {
  const navi = useNavigation();
  const router = useRoute();

  const { user } = useStores(stores => ({
    user: stores.userStore.user,
  }));

  const handleNavigate = () => {
    const screen = user ? SCREENS.Subscriptions : SCREENS.Login;

    navi.navigate(screen);
  };

  return (
    <Button onPress={handleNavigate} {...btnProps}>
      {children}
    </Button>
  );
};

export const GoToPayContentLink = observer(GoToPayContentLinkComponent);

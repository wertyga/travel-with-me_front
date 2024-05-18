import { useRoute } from '@react-navigation/native';
import Button, { CustomButtonProps } from '@/components/Button';
import { useAuth } from '@/context';
import { useNavigation } from '@/hooks';
import { setBackScreenData } from '@/stores';
import { SCREENS } from '@/types';

type Props = Omit<CustomButtonProps, 'onPress' | 'href'> & {};

export const GoToPayContentLink = ({
  children,
  hrefParams,
  href,
  ...btnProps
}: Props) => {
  const navi = useNavigation();
  const router = useRoute();
  const { user } = useAuth();

  const handleNavigate = () => {
    const linkParams = { ...(hrefParams || {}), ...(router.params || {}) };
    const screen = user ? SCREENS.Subscriptions : SCREENS.Login;
    setBackScreenData(router.name as SCREENS, linkParams);

    navi.navigate(screen);
  };

  return (
    <Button onPress={handleNavigate} {...btnProps}>
      {children}
    </Button>
  );
};

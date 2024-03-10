import Button, { CustomButtonProps } from '@/components/Button';
import { useAuth } from '@/context';
import { useNavigation } from '@/hooks';
import { SCREENS } from '@/types';
import { useRoute } from '@react-navigation/native';

type Props = Omit<CustomButtonProps, 'onPress' | 'href'> & {};

export const GoToPayContentLink = ({
  children,
  hrefParams,
  href,
  ...btnProps
}: Props) => {
  const navi = useNavigation();
  const router = useRoute();
  const { setBackScreenData, user } = useAuth();

  const handleNavigate = () => {
    const linkParams = { ...(hrefParams || {}), ...(router.params || {}) };
    const screen = user ? SCREENS.Subscriptions : SCREENS.Login;
    setBackScreenData({ href: router.name as SCREENS, params: linkParams });

    navi.navigate(screen);
  };

  return (
    <Button onPress={handleNavigate} {...btnProps}>
      {children}
    </Button>
  );
};

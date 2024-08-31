import { useNavigation } from '@/hooks';

import { BaseButton, CustomButtonProps } from './BaseButton';

export const LinkButton = ({
  href,
  hrefParams,
  onPress: propsOnPress,
  ...props
}: CustomButtonProps) => {
  const navi = useNavigation();

  const handleOnPress = () => {
    propsOnPress?.();

    navi.navigate(href, hrefParams);
  };

  return <BaseButton {...props} onPress={handleOnPress} />;
};

import { BaseButton, CustomButtonProps } from './BaseButton';
import { LinkButton } from './LinkButton';

const Button = (props: CustomButtonProps) => {
  if (props.href) {
    return <LinkButton {...props} />;
  }

  return <BaseButton {...props} />;
};

export default Button;

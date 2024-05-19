import { ButtonStylesProp, CustomButtonProps } from '@/components/Button/index';
import { getTruthlyValues } from '@/utils';

const getButtonStyles = (styles: ButtonStylesProp) => {
  const {
    fontSize,
    color,
    fontFamily,
    fontWeight,
    textDecorationLine,
    ...btnStyle
  } = styles as any;

  return {
    button: getTruthlyValues(btnStyle),
    text: getTruthlyValues({
      fontSize,
      color,
      fontFamily,
      fontWeight,
      textDecorationLine,
    }),
  };
};

export const getArrayedButtonStyles = (
  styles: CustomButtonProps['style'] | CustomButtonProps['style'][]
) => {
  const st: any = Array.isArray(styles) ? styles : [styles];

  return st.reduce(
    (acc: any, s: any) => {
      const { button, text } = getButtonStyles(s);

      return {
        button: [...acc.button, button],
        text: [...acc.text, text],
      };
    },
    { button: [], text: [] }
  );
};

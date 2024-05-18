import { getTruthlyValues } from '@/utils';

const getButtonStyles = (styles: Record<string, string>) => {
  const { fontSize, color, fontFamily, fontWeight, ...btnStyle } = styles;

  return {
    button: getTruthlyValues(btnStyle),
    text: getTruthlyValues({
      fontSize,
      color,
      fontFamily,
      fontWeight,
    }),
  };
};

export const getArrayedButtonStyles = (
  styles: Record<string, string> | Record<string, string>[]
) => {
  const st = Array.isArray(styles) ? styles : [styles];

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

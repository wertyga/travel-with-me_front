import { ScrollView, ScrollViewProps } from 'react-native';

type Props = ScrollViewProps & {
  edge?: number;
};

export const ScrollHorizontalNoEdges = ({
  edge,
  children,
  style,
  contentContainerStyle,
  ...scrollProps
}: Props) => {
  const editedStyles: typeof style = edge
    ? {
        marginHorizontal: -edge,
      }
    : undefined;
  const editedContentStyles: typeof style = edge
    ? {
        paddingHorizontal: edge,
      }
    : undefined;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      {...scrollProps}
      style={[style, editedStyles]}
      contentContainerStyle={[contentContainerStyle, editedContentStyles]}
    >
      {children}
    </ScrollView>
  );
};

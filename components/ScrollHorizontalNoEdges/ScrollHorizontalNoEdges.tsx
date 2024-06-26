import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

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
      style={[styles.container, style, editedStyles]}
      contentContainerStyle={[contentContainerStyle, editedContentStyles]}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
  },
});

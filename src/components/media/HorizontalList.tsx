import React, { ReactElement } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface HorizontalListProps<T> {
  data: T[];
  renderItem: (item: T) => ReactElement;
  keyExtractor: (item: T) => string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const HorizontalList = <T,>({
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
}: HorizontalListProps<T>) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={[styles.content, contentContainerStyle]}
  >
    {data.map((item) => (
      <React.Fragment key={keyExtractor(item)}>
        {renderItem(item)}
      </React.Fragment>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});

export default HorizontalList;

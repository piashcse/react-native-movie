import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  DimensionValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { appColors } from '../../constant/appColors.ts';

interface ShimmerBlockProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const ShimmerBlock = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}: ShimmerBlockProps) => {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const translateX = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    if (!layoutWidth) {
      return;
    }

    translateX.setValue(-1);
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        isInteraction: false,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [layoutWidth, translateX]);

  const highlightTranslate = translateX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-layoutWidth, layoutWidth],
  });

  return (
    <View
      onLayout={(event) => setLayoutWidth(event.nativeEvent.layout.width)}
      style={[styles.block, { width, height, borderRadius }, style]}
    >
      {layoutWidth > 0 ? (
        <Animated.View
          style={[
            styles.highlight,
            {
              width: Math.max(60, layoutWidth * 0.55),
              transform: [{ translateX: highlightTranslate }],
            },
          ]}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    overflow: 'hidden',
    backgroundColor: appColors.skeletonBaseColor,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: appColors.skeletonHighlightColor,
  },
});

export default ShimmerBlock;

import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  TextStyle,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';

interface ReadMoreTextProps {
  readMoreStyle?: TextStyle;
  text: string;
  textStyle?: TextStyle;
  numberOfLines?: number;
}

const SeeMoreText: React.FC<ReadMoreTextProps> = ({
  readMoreStyle,
  text,
  textStyle,
  numberOfLines = 3,
}: ReadMoreTextProps) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState<number | undefined>(numberOfLines);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : numLines);
  }, [textShown]);

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (e.nativeEvent.lines.length > 3 && !textShown) {
        setShowMoreButton(true);
        setNumLines(numberOfLines);
      }
    },
    [textShown]
  );

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={numLines}
        style={textStyle}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
      {showMoreButton ? (
        <Text onPress={toggleTextShown} style={readMoreStyle}>
          {textShown ? 'See Less' : 'See More'}
        </Text>
      ) : null}
    </>
  );
};

export default SeeMoreText;

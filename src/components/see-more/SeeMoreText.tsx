import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextLayoutEventData,
  TextStyle,
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
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState<number | undefined>(numberOfLines);

  const toggleTextShown = () => {
    setTextShown((prev) => !prev);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : numberOfLines);
  }, [textShown, numberOfLines]);

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      const linesCount = e.nativeEvent.lines.length;
      console.log('Total lines in text:', linesCount);

      if (linesCount > numberOfLines && !showMoreButton) {
        setShowMoreButton(true);
      }
    },
    [numberOfLines, showMoreButton]
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

      {showMoreButton && (
        <Text onPress={toggleTextShown} style={readMoreStyle}>
          {textShown ? 'See Less' : 'See More'}
        </Text>
      )}
    </>
  );
};

export default SeeMoreText;

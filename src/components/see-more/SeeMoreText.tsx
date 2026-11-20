import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextLayoutEvent, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);

  useEffect(() => {
    setShowMoreButton(false);
    setTextShown(false);
  }, [text, numberOfLines]);

  const onTextLayout = useCallback(
    (event: TextLayoutEvent) => {
      const linesCount = event.nativeEvent.lines.length;
      if (linesCount > numberOfLines) {
        setShowMoreButton(true);
      }
    },
    [numberOfLines]
  );

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : numberOfLines}
        style={textStyle}
        ellipsizeMode="tail"
      >
        {text}
      </Text>

      {showMoreButton ? (
        <Text
          onPress={() => setTextShown((previous) => !previous)}
          style={readMoreStyle}
          accessibilityRole="button"
        >
          {textShown ? t('common.seeLess') : t('common.seeMore')}
        </Text>
      ) : null}
    </>
  );
};

export default SeeMoreText;

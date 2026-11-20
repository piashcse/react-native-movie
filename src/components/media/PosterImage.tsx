import React, { memo, useEffect, useState } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { ImageSize } from '../../constant/appConstants.ts';
import { getImageUrl } from '../../utils/image.ts';

const placeholder = require('../../assets/placeholder.jpeg');

interface PosterImageProps {
  path?: string | null;
  size?: ImageSize;
  style?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
}

const PosterImage = memo(
  ({ path, size = 'w342', style, accessibilityLabel }: PosterImageProps) => {
    const [failed, setFailed] = useState(false);
    const uri = getImageUrl(path, size);

    useEffect(() => {
      setFailed(false);
    }, [path]);

    return (
      <Image
        source={uri && !failed ? { uri, cache: 'force-cache' } : placeholder}
        style={style}
        onError={() => setFailed(true)}
        accessible={Boolean(accessibilityLabel)}
        accessibilityLabel={accessibilityLabel}
      />
    );
  }
);

PosterImage.displayName = 'PosterImage';

export default PosterImage;

import * as React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

export default function LocationPin() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_449_3457)">
        <Path
          d="M12 2C7.8 2 4 5.22 4 10.2C4 13.38 6.45 17.12 11.34 21.43C11.72 21.76 12.29 21.76 12.67 21.43C17.55 17.12 20 13.38 20 10.2C20 5.22 16.2 2 12 2ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
          fill="#FF3B30"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_449_3457">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
} 
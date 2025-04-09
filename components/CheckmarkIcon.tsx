import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckmarkIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({ 
  width = 75, 
  height = 74, 
  color = 'white' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 75 74" fill="none">
      <Path
        d="M37.5002 0.333496C17.2602 0.333496 0.833496 16.7602 0.833496 37.0002C0.833496 57.2402 17.2602 73.6668 37.5002 73.6668C57.7402 73.6668 74.1668 57.2402 74.1668 37.0002C74.1668 16.7602 57.7402 0.333496 37.5002 0.333496ZM30.1668 55.3335L11.8335 37.0002L17.0035 31.8302L30.1668 44.9568L57.9968 17.1268L63.1668 22.3335L30.1668 55.3335Z"
        fill={color}
      />
    </Svg>
  );
};

export default CheckmarkIcon;

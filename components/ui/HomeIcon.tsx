import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HomeIconProps {
  color: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ color }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M12 2.09961L1 12H4V21H11V15H13V21H20V12H23L12 2.09961Z" fill={color}/>
    </Svg>
  );
};

export default HomeIcon;

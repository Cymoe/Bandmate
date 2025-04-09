import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface NotificationIconProps {
  color: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ color }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 20 20" fill="none">
      <Path 
        d="M10 20C11.1 20 12 19.1 12 18H8C8 19.1 8.9 20 10 20ZM16 14V9C16 5.93 14.37 3.36 11.5 2.68V2C11.5 1.17 10.83 0.5 10 0.5C9.17 0.5 8.5 1.17 8.5 2V2.68C5.64 3.36 4 5.92 4 9V14L2 16V17H18V16L16 14ZM14 15H6V9C6 6.52 7.51 4.5 10 4.5C12.49 4.5 14 6.52 14 9V15ZM5.58 2.08L4.15 0.65C1.75 2.48 0.169999 5.3 0.0299988 8.5H2.03C2.18 5.85 3.54 3.53 5.58 2.08ZM17.97 8.5H19.97C19.82 5.3 18.24 2.48 15.85 0.65L14.43 2.08C16.45 3.53 17.82 5.85 17.97 8.5Z" 
        fill={color} 
        fillOpacity="0.48"
      />
    </Svg>
  );
};

export default NotificationIcon;

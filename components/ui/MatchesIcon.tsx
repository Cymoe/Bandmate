import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

interface MatchesIconProps {
  color: string;
}

const MatchesIcon: React.FC<MatchesIconProps> = ({ color }) => {
  return (
    <Svg width="23" height="24" viewBox="0 0 23 24" fill="none">
      <Rect x="1.20423" y="5.54394" width="14.6" height="14.6" rx="1.3" transform="rotate(-16.6098 1.20423 5.54394)" stroke={color} strokeWidth="1.4"/>
      <Path d="M9.37029 14.3778L7.36932 7.66992L13.6403 9.45169L9.37029 14.3778Z" fill="#908D8A"/>
      <Rect x="7.03334" y="8.2" width="14.6" height="14.6" rx="1.3" fill={color} stroke={color} strokeWidth="1.4"/>
      <Path d="M12.3333 17.907V13.093C12.3333 12.6195 12.856 12.3326 13.2555 12.5868L17.0379 14.9938C17.4084 15.2296 17.4084 15.7704 17.0379 16.0062L13.2555 18.4132C12.856 18.6674 12.3333 18.3804 12.3333 17.907Z" fill="#16151A"/>
    </Svg>
  );
};

export default MatchesIcon;

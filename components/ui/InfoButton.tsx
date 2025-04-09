import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

interface InfoButtonProps {
  onPress?: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <Rect y="64" width="64" height="64" rx="32" transform="rotate(-90 0 64)" fill="#007AFF"/>
        <Path d="M20.8943 39.0764L31.0705 20.9854C31.4783 20.2605 32.522 20.2605 32.9298 20.9854L43.106 39.0764C43.506 39.7874 42.9921 40.666 42.1763 40.666H21.824C21.0082 40.666 20.4944 39.7875 20.8943 39.0764Z" fill="#121212"/>
      </Svg>
    </TouchableOpacity>
  );
};

export default InfoButton;

import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

interface LikeButtonProps {
  onPress?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <Rect width="64" height="64" rx="32" fill="#1ED760"/>
        <Path d="M24.9231 20.8942L43.0141 31.0703C43.739 31.4781 43.739 32.5219 43.0141 32.9297L24.9231 43.1058C24.2121 43.5058 23.3335 42.992 23.3335 42.1762V21.8238C23.3335 21.008 24.2121 20.4942 24.9231 20.8942Z" fill="#121212"/>
      </Svg>
    </TouchableOpacity>
  );
};

export default LikeButton;

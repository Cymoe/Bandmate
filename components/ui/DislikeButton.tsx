import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

interface DislikeButtonProps {
  onPress?: () => void;
}

const DislikeButton: React.FC<DislikeButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <Rect x="64" y="64" width="64" height="64" rx="32" transform="rotate(-180 64 64)" fill="#F41857"/>
        <Path d="M39.0771 43.1058L20.9861 32.9297C20.2611 32.5219 20.2611 31.4781 20.9861 31.0703L39.0771 20.8942C39.7881 20.4942 40.6667 21.008 40.6667 21.8238V42.1762C40.6667 42.992 39.7881 43.5058 39.0771 43.1058Z" fill="#121212"/>
      </Svg>
    </TouchableOpacity>
  );
};

export default DislikeButton;

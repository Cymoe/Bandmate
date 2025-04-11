import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MessageProps {
  text: string;
  timestamp: string;
  sender: string;
  isTranslated?: boolean;
  originalText?: string;
  isLiked?: boolean;
  isSent?: boolean;
  isRead?: boolean;
  onLike?: () => void;
  onReport?: () => void;
  onReply?: () => void;
  onTranslate?: () => void;
}

const Message = ({
  text,
  timestamp,
  sender,
  isTranslated = false,
  originalText,
  isLiked = false,
  isSent = false,
  isRead = false,
  onLike,
  onReport,
  onReply,
  onTranslate,
}: MessageProps) => {
  const [showOriginal, setShowOriginal] = useState(false);

  const toggleTranslation = () => {
    setShowOriginal(!showOriginal);
  };

  return (
    <View style={[styles.container, isSent && styles.sentContainer]}>
      <View style={[styles.headerContainer, isSent && styles.sentHeaderContainer]}>
        {isSent && isRead && (
          <>
            <MaterialCommunityIcons name="check" size={12} color="#FF4D00" />
            <View style={styles.separator} />
          </>
        )}
        <Text style={styles.timestamp}>{`${sender} ${timestamp}`}</Text>
      </View>
      
      <View style={[
        styles.messageContainer, 
        isSent && styles.sentMessageContainer,
        isTranslated && styles.translatedMessage
      ]}>
        <Text style={styles.messageText}>
          {isTranslated && showOriginal ? originalText : text}
        </Text>
      </View>

      <View style={[styles.actionsContainer, isSent && styles.sentActionsContainer]}>
        {isTranslated && (
          <TouchableOpacity onPress={toggleTranslation}>
            <Text style={styles.translateText}>
              {showOriginal ? 'See translation' : 'See original'}
            </Text>
          </TouchableOpacity>
        )}
        {!isTranslated && onTranslate && (
          <TouchableOpacity onPress={onTranslate}>
            <Text style={styles.translateText}>Translate</Text>
          </TouchableOpacity>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onLike}
          >
            <MaterialCommunityIcons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={12} 
              color={isLiked ? "#EE1045" : "#828282"} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onReply}
          >
            <MaterialCommunityIcons 
              name="reply" 
              size={12} 
              color="#828282" 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onReport}
          >
            <MaterialCommunityIcons 
              name="dots-horizontal" 
              size={12} 
              color="#828282" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 351,
    paddingVertical: 8,
    gap: 8,
  },
  sentContainer: {
    alignItems: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sentHeaderContainer: {
    justifyContent: 'flex-end',
  },
  separator: {
    width: 1,
    height: 10,
    backgroundColor: '#828186',
    marginHorizontal: 4,
  },
  timestamp: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    color: '#6B6B6B',
  },
  messageContainer: {
    maxWidth: 343,
    minHeight: 66,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 24,
    },
    shadowOpacity: 0.06,
    shadowRadius: 70,
    elevation: 3,
  },
  sentMessageContainer: {
    backgroundColor: '#262626',
    alignSelf: 'flex-end',
  },
  translatedMessage: {
    backgroundColor: '#FF4D00',
  },
  messageText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: '#FFFFFF',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 24,
  },
  sentActionsContainer: {
    justifyContent: 'flex-end',
  },
  translateText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    color: '#828282',
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 22, 0.24)',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 100,
    ...Platform.select({
      ios: {
        backdropFilter: 'blur(4px)',
      },
      android: {
        backgroundColor: 'rgba(20, 20, 22, 0.4)',
      },
    }),
  },
});

export default Message; 
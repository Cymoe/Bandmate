import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  StatusBar as RNStatusBar
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Svg, { Path, G, Rect, ClipPath, Defs } from 'react-native-svg';

// Better SparkleIcon component matching the design
const SparkleIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <G>
      <Path d="M10.06 7.11L10.06 7.11L10.06 7.11C10.06 7.11 10.06 7.11 10.06 7.11Z" fill="#FE6F3B"/>
      <Path
        d="M11 10L13 6L11 2L9 6L11 10ZM11 10L7 12L3 10L7 8L11 10ZM11 10L13 14L11 18L9 14L11 10ZM11 10L15 8L19 10L15 12L11 10Z"
        fill="#FE6F3B"
      />
    </G>
  </Svg>
);

// Message component to display individual messages
const Message = ({ text, isUser, timestamp }: { text: string; isUser: boolean; timestamp?: string }) => (
  <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.otherMessageRow]}>
    {!isUser && (
      <Image 
        source={require('@/assets/images/avatar.png')} 
        style={styles.messageAvatar} 
      />
    )}
    <View style={[styles.messageBubble, isUser ? styles.userMessageBubble : styles.otherMessageBubble]}>
      <Text style={styles.messageText}>{text}</Text>
      {timestamp && <Text style={styles.messageTimestamp}>{timestamp}</Text>}
    </View>
  </View>
);

export default function ChatDetailScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey, I really liked your playlist! The lo-fi beats are perfect for studying.', isUser: false, timestamp: '10:45 AM' },
    { id: '2', text: 'Thanks! I made it during finals week last semester 😅', isUser: true, timestamp: '10:47 AM' },
  ]);
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Shared playlists data
  const sharedPlaylists = [
    {
      id: '1',
      title: 'Lo-fi beats to study while crying',
      icon: <SparkleIcon />,
    },
    {
      id: '2',
      title: 'Lo-fi beats to study while crying',
      icon: <SparkleIcon />,
    }
  ];
  
  // Handle sending a new message
  const sendMessage = () => {
    if (message.trim().length === 0) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  // The bottom of keyboard input field should respect safe area
  const bottomPadding = Platform.OS === 'ios' ? insets.bottom : 0;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <LinearGradient
        colors={['#121212', '#121212']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Status Bar is included in the header now */}
      
      {/* Header */}
      <BlurView intensity={60} tint="dark" style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#F8F9FB" />
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <View style={styles.statusDot} />
              <Text style={styles.nameText}>Catie, 24</Text>
            </View>
            
            <View style={styles.locationRow}>
              <Ionicons name="location" size={12} color="#828186" />
              <Text style={styles.locationText}>Los Angeles</Text>
              <View style={styles.separator} />
              <Text style={styles.artistTypeText}>Solo Artist</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/chat-settings')}>
            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <Rect width="40" height="40" rx="20" fill="white" fillOpacity="0.08"/>
              <G clipPath="url(#clip0_221_2018)">
                <Path d="M12.5 25C12.5 25.4583 12.875 25.8333 13.3333 25.8333H17.5V24.1667H13.3333C12.875 24.1667 12.5 24.5417 12.5 25ZM12.5 15C12.5 15.4583 12.875 15.8333 13.3333 15.8333H20.8333V14.1667H13.3333C12.875 14.1667 12.5 14.5417 12.5 15ZM20.8333 26.6667V25.8333H26.6667C27.125 25.8333 27.5 25.4583 27.5 25C27.5 24.5417 27.125 24.1667 26.6667 24.1667H20.8333V23.3333C20.8333 22.875 20.4583 22.5 20 22.5C19.5417 22.5 19.1667 22.875 19.1667 23.3333V26.6667C19.1667 27.125 19.5417 27.5 20 27.5C20.4583 27.5 20.8333 27.125 20.8333 26.6667ZM15.8333 18.3333V19.1667H13.3333C12.875 19.1667 12.5 19.5417 12.5 20C12.5 20.4583 12.875 20.8333 13.3333 20.8333H15.8333V21.6667C15.8333 22.125 16.2083 22.5 16.6667 22.5C17.125 22.5 17.5 22.125 17.5 21.6667V18.3333C17.5 17.875 17.125 17.5 16.6667 17.5C16.2083 17.5 15.8333 17.875 15.8333 18.3333ZM27.5 20C27.5 19.5417 27.125 19.1667 26.6667 19.1667H19.1667V20.8333H26.6667C27.125 20.8333 27.5 20.4583 27.5 20ZM23.3333 17.5C23.7917 17.5 24.1667 17.125 24.1667 16.6667V15.8333H26.6667C27.125 15.8333 27.5 15.4583 27.5 15C27.5 14.5417 27.125 14.1667 26.6667 14.1667H24.1667V13.3333C24.1667 12.875 23.7917 12.5 23.3333 12.5C22.875 12.5 22.5 12.875 22.5 13.3333V16.6667C22.5 17.125 22.875 17.5 23.3333 17.5Z" fill="#F8F9FB"/>
              </G>
              <Defs>
                <ClipPath id="clip0_221_2018">
                  <Rect width="20" height="20" fill="white" transform="translate(10 10)"/>
                </ClipPath>
              </Defs>
            </Svg>
          </TouchableOpacity>
        </View>
      </BlurView>
      
      {/* Match info banner */}
      <View style={styles.matchInfoContainer}>
        <View style={styles.matchInfoLine} />
        <Text style={styles.matchInfoText}>You matched with Catie on Jan 4, 2023</Text>
        <View style={styles.matchInfoLine} />
      </View>
      
      <ScrollView 
        style={styles.messageContainer}
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Shared playlists section */}
        <View style={styles.sharedPlaylistsContainer}>
          {sharedPlaylists.map(playlist => (
            <View key={playlist.id} style={styles.playlistCard}>
              {playlist.icon}
              <Text style={styles.playlistTitle}>{playlist.title}</Text>
            </View>
          ))}
        </View>
        
        {/* Chat messages */}
        <View style={styles.messagesContainer}>
          {messages.map(msg => (
            <Message 
              key={msg.id} 
              text={msg.text} 
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
        </View>
      </ScrollView>
      
      {/* Message input */}
      <View style={[styles.inputContainer, { paddingBottom: bottomPadding || 16 }]}>
        <View style={styles.messageInputRow}>
          <TouchableOpacity style={styles.emojiButton}>
            <Ionicons name="happy-outline" size={24} color="#121212" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Driving at night"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={message}
            onChangeText={setMessage}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              message.trim().length > 0 ? styles.activeSendButton : styles.inactiveSendButton
            ]}
            onPress={sendMessage}
            disabled={message.trim().length === 0}
          >
            <Ionicons 
              name="arrow-up" 
              size={24} 
              color={message.trim().length > 0 ? "#121212" : "#FFFFFF"} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.homeIndicator} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 44 : RNStatusBar.currentHeight || 0,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#64CD75',
    marginRight: 6,
  },
  nameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#F8F9FB',
    letterSpacing: -0.03 * 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#828186',
    marginLeft: 4,
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#828186',
    marginHorizontal: 4,
  },
  artistTypeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#828186',
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  matchInfoLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#828186',
    opacity: 0.5,
  },
  matchInfoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#828186',
    marginHorizontal: 8,
    textTransform: 'capitalize',
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sharedPlaylistsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 16,
    gap: 8,
    marginBottom: 16,
  },
  playlistCard: {
    width: 208,
    height: 120,
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  playlistTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.64)',
    marginTop: 6,
  },
  messagesContainer: {
    paddingVertical: 0,
    gap: 10,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    paddingVertical: 8,
  },
  userMessageBubble: {
    backgroundColor: '#64CD75',
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  otherMessageBubble: {
    backgroundColor: '#262626',
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#F8F9FB',
    lineHeight: 22,
  },
  messageTimestamp: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#121212',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  messageInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingHorizontal: 12,
    height: 56,
  },
  emojiButton: {
    marginRight: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSendButton: {
    backgroundColor: '#64CD75',
  },
  inactiveSendButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: Platform.OS === 'ios' ? 5 : 5,
  },
}); 
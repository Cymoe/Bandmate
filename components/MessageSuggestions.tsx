import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MessageSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  userProfile: {
    interests?: string[];
    occupation?: string;
    location?: string;
    recentMessages?: string[];
  };
}

const CARD_WIDTH = 208;
const CARD_MARGIN = 8;
const CARD_FULL_WIDTH = CARD_WIDTH + CARD_MARGIN;

const MessageSuggestions: React.FC<MessageSuggestionsProps> = ({
  suggestions,
  onSelectSuggestion,
  userProfile,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Suggested Replies</Text>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      snapToInterval={CARD_FULL_WIDTH}
      decelerationRate="fast"
      snapToAlignment="start"
      pagingEnabled={false}
    >
      {suggestions.map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.suggestionCard,
            index === suggestions.length - 1 ? null : styles.cardMargin
          ]}
          onPress={() => onSelectSuggestion(suggestion)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#FE6F3B" />
          <Text style={styles.suggestionText} numberOfLines={3}>
            {suggestion}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#828186',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  suggestionCard: {
    width: CARD_WIDTH,
    height: 120,
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    gap: 6,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardMargin: {
    marginRight: CARD_MARGIN,
  },
  suggestionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.64)',
    flex: 1,
  },
});

export default MessageSuggestions; 
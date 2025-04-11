interface UserProfile {
  interests?: string[];
  occupation?: string;
  location?: string;
  recentMessages?: string[];
  playlists?: {
    title: string;
    genre?: string;
  }[];
}

interface ConversationContext {
  lastMessageTimestamp: Date;
  lastMessageFromUser: boolean;
  messages: {
    text: string;
    isUser: boolean;
    timestamp: Date;
  }[];
}

export function generateMessageSuggestions(
  profile: UserProfile,
  context: ConversationContext
): string[] {
  // Check if 24 hours have passed since last message
  const hoursSinceLastMessage = (new Date().getTime() - context.lastMessageTimestamp.getTime()) / (1000 * 60 * 60);
  
  if (hoursSinceLastMessage < 24 || context.lastMessageFromUser) {
    return [];
  }

  const suggestions: string[] = [];

  // Music-related suggestions based on shared playlists
  if (profile.playlists?.length) {
    const playlist = profile.playlists[0];
    suggestions.push(
      `I noticed you're into ${playlist.genre || 'this kind of music'} too! What other artists do you listen to?`,
      `Your playlist "${playlist.title}" is really cool! How did you discover this style?`
    );
  }

  // Location-based suggestions
  if (profile.location) {
    suggestions.push(
      `Do you play at any venues in ${profile.location}?`,
      `What's the music scene like in ${profile.location}?`
    );
  }

  // Occupation-based suggestions
  if (profile.occupation) {
    suggestions.push(
      `How long have you been a ${profile.occupation}?`,
      `What inspired you to become a ${profile.occupation}?`
    );
  }

  // Context-based suggestions from recent messages
  const lastMessage = context.messages[context.messages.length - 1];
  if (lastMessage && !lastMessage.isUser) {
    if (lastMessage.text.toLowerCase().includes('playlist')) {
      suggestions.push(
        "I'd love to hear more about your music taste!",
        "What's your creative process like when making playlists?"
      );
    }
    if (lastMessage.text.toLowerCase().includes('perform') || lastMessage.text.toLowerCase().includes('show')) {
      suggestions.push(
        "When's your next show?",
        "I'd love to see you perform sometime!"
      );
    }
  }

  // Interests-based suggestions
  profile.interests?.forEach(interest => {
    suggestions.push(
      `I see you're into ${interest}! What got you started with that?`,
      `Would love to hear more about your experience with ${interest}`
    );
  });

  // Return a maximum of 3 most relevant suggestions
  return suggestions.slice(0, 3);
} 
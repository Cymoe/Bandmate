import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NotificationCategory = 
  | 'matching'
  | 'subscription'
  | 'events'
  | 'engagement'
  | 'collaboration';

export type NotificationSetting = {
  id: string;
  enabled: boolean;
};

export type NotificationSettings = {
  [key: string]: boolean;
};

class NotificationService {
  private static instance: NotificationService;
  private settings: NotificationSettings = {};

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize() {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }

    // Load saved settings
    await this.loadSettings();

    // Configure notification behavior
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    return true;
  }

  private async loadSettings() {
    try {
      const settings = await AsyncStorage.getItem('notificationSettings');
      if (settings) {
        this.settings = JSON.parse(settings);
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  }

  async saveSettings(settings: NotificationSettings) {
    try {
      this.settings = settings;
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  }

  async getSettings(): Promise<NotificationSettings> {
    return this.settings;
  }

  async scheduleNotification(
    title: string,
    body: string,
    category: NotificationCategory,
    id: string,
    trigger?: Notifications.NotificationTriggerInput
  ) {
    // Check if this type of notification is enabled
    if (!this.settings[id]) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { category, id },
      },
      trigger: trigger || null,
    });
  }

  // Matching Notifications
  async sendNewMatchNotification(matchName: string) {
    await this.scheduleNotification(
      '🎸 New Match!',
      `${matchName} is ready to jam with you. Start chatting now!`,
      'matching',
      'new_match'
    );
  }

  async sendProfileLikeNotification(userName: string) {
    await this.scheduleNotification(
      '🎤 New Like!',
      `${userName} just liked your profile. Swipe back to connect!`,
      'matching',
      'profile_likes'
    );
  }

  // Subscription Notifications
  async sendSubscriptionEndingNotification(daysLeft: number) {
    await this.scheduleNotification(
      '⏳ Subscription Ending',
      `Your free trial ends in ${daysLeft} days! Renew now to keep connecting with musicians.`,
      'subscription',
      'subscription_status'
    );
  }

  async sendSpecialOfferNotification(discount: string) {
    await this.scheduleNotification(
      '🎉 Special Offer!',
      `Flash Sale! Upgrade to premium at ${discount} off for the next 24 hours!`,
      'subscription',
      'special_offers'
    );
  }

  // Event Notifications
  async sendEventNotification(eventName: string, venue: string) {
    await this.scheduleNotification(
      '🎤 Upcoming Event',
      `${eventName} happening at ${venue}. RSVP now!`,
      'events',
      'local_events'
    );
  }

  async sendJamSessionReminder(userName: string, time: string) {
    await this.scheduleNotification(
      '🎸 Jam Session Reminder',
      `Your jam session with ${userName} starts in ${time}!`,
      'events',
      'jam_sessions'
    );
  }

  // Engagement Notifications
  async sendProfileViewNotification(views: number) {
    await this.scheduleNotification(
      '📈 Profile Views Update',
      `Your profile views increased by ${views}% this week—keep the momentum going!`,
      'engagement',
      'profile_views'
    );
  }

  async sendMessageReminder(userName: string) {
    await this.scheduleNotification(
      '💬 Unread Messages',
      `You have unread messages from ${userName}. Don't leave them hanging!`,
      'engagement',
      'messages'
    );
  }

  // Collaboration Notifications
  async sendProjectUpdateNotification(userName: string, projectName: string) {
    await this.scheduleNotification(
      '🎼 Project Update',
      `${userName} just updated the project "${projectName}"—check it out!`,
      'collaboration',
      'project_updates'
    );
  }

  async sendFeedbackNotification(userName: string) {
    await this.scheduleNotification(
      '💭 New Feedback',
      `${userName} left feedback on your work. See what they said!`,
      'collaboration',
      'feedback'
    );
  }
}

export default NotificationService.getInstance(); 
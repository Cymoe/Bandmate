Reanimated + gesture-handler for tinder swiping functionality  



I'll incorporate these UI design guidelines for the construction management app. Here's how we should implement form inputs and text elements across the application:
Input Field Design Guidelines
Input Validation

Valid inputs: Green check icon (✓)
Invalid inputs: Red cancel icon (✗)
Show validation status in real-time as users enter data

Input Labels and Descriptions

Every input should have a clear label
Include a concise, friendly description explaining the purpose
Example: "Project Name (Required)" with description "Enter the official name as it appears on contracts"

Input Reset Functionality

Add a cancel/clear icon (×) that appears only when an input has content
Clicking this icon resets the input to empty

Visual Design Elements

Use rounded Google Material icons throughout the app
Typography:

Body text and labels (≤ 18px): Poppins font family
Headings (≥ 20px): Abril Fatface font family



Example Implementation for Project Creation Form
Form Fields:

Project Name: Required field with validation
Client Name: Required field with validation
Project Location: Required with address validation
Start Date: Date picker with calendar format validation
Budget: Number field with currency format validation
Project Description: Optional text area



always color code input with a green check icon if valid or red cancel icon if invalid.

Always add a label below inputs that ask for a requirement to be completed. Add a small description of the purpose of an input and make it concise and friendly.

Make sure that all text inputs have a "cancel icon" to reset the input if a value is populated within that said input. This "cancel icon" to reset the input is only visible when the input is populated with a value.

Always ask the AI agent to use rounded Google Materal icons. And poppins font family for text below or equal to 18px. For text that are equal or above 20px use Abril Fatface.


Colors: export const colors = {
  // Primary colors
  primary: '#FF4B4B',
  primaryDark: '#1ed760',
  primaryLight: '#1fdf64',

  // Background colors
  background: '#121212', // Spotify dark theme
  backgroundLight: '#282828',
  backgroundLighter: '#1E1E1E',
  backgroundDark: '#000000',

  // Text colors
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textTertiary: '#727272',

  // Status colors
  success: '#1DB954',
  error: '#F15E6C',
  warning: '#FFA726',
  info: '#29B6F6',

  // Gradient colors
  gradient: {
    primary: ['#1DB954', '#1ed760'],
    dark: ['#121212', '#000000'],
    light: ['#282828', '#121212']
  }
}; 

Spacing: export const spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,

  // Layout spacing
  screenPadding: 16,
  sectionSpacing: 24,
  componentSpacing: 16,
  elementSpacing: 8,

  // Border radius
  borderRadius: {
    sm: 4,
    base: 8,
    lg: 16,
    xl: 24,
    full: 9999
  }
};



scroll and snap for all repeating groups, vertical or horizontal
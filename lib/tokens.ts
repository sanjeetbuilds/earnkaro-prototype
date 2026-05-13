// EarnKaro design tokens — matched to the actual app
export const tokens = {
  colors: {
    // Primary brand
    primary: '#1AB266',           // EarnKaro green (CTA, brand)
    primaryDark: '#0F9655',
    primaryLight: '#E8F7EF',

    // Surfaces
    bg: '#FFFFFF',
    bgMuted: '#F5F6F8',
    bgCard: '#FFFFFF',

    // Header gradient (the green-to-teal at top of in-app screens)
    headerGradientFrom: '#1AB266',
    headerGradientTo: '#0E8C5A',

    // Text
    textPrimary: '#0F1419',
    textSecondary: '#5C6670',
    textMuted: '#8B95A0',

    // Accents
    accentPink: '#FF2D7B',        // "On Sale" / "Best Deal" badges
    accentBlue: '#2D7BFF',         // Discount text
    accentOrange: '#FF9500',       // Pending state
    accentRed: '#FF3B30',          // Cancelled / error

    // Status colors (reports breakup)
    statusPending: '#FF9500',
    statusConfirmed: '#1AB266',
    statusPaid: '#2D7BFF',
    statusRequested: '#A855F7',
    statusCancelled: '#FF3B30',

    // Borders
    border: '#E5E8EB',
    borderLight: '#F0F2F4',
  },
  spacing: {
    xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px', xxl: '32px',
  },
  radius: {
    sm: '8px', md: '12px', lg: '16px', xl: '24px', full: '9999px',
  },
  font: {
    sans: 'Inter, -apple-system, system-ui, sans-serif',
  }
};

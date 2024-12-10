export const ROUTES = {
  HOME: '/',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    MODERATION: '/admin/moderation',
    ANALYTICS: '/admin/analytics',
    REVENUE: '/admin/revenue',
    SETTINGS: '/admin/settings',
    HEALTH: '/admin/health',
    REPORTS: '/admin/reports',
    AUDIT: '/admin/audit',
  },
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CONTENT_CREATOR: {
      APPLY: '/auth/content-creator',
      SIGN_UP: '/auth/content-creator/sign-up'
    },
  },
  PROFILE: {
    VIEW: '/profile',
    EDIT: '/profile/edit',
    SETTINGS: '/profile/settings',
  },
  VIDEO: {
    WATCH: (id: string) => `/watch/${id}`,
    UPLOAD: '/upload',
    EDIT: (id: string) => `/video/${id}/edit`,
  },
  CHANNEL: {
    VIEW: (username: string) => `/channel/${username}`,
    EDIT: '/channel/edit',
  }
} as const; 
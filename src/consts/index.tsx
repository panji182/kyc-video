import { UserMenuAccess } from '@/types/const';

export const paths = {
  dashboard: {
    parentMenu: 'Dashboard',
    href: '/',
  },
  viewUsers: {
    parentMenu: 'User Management',
    href: '/user-management/view-users',
  },
  roleAndPermissions: {
    parentMenu: 'User Management',
    href: '/user-management/role-and-permissions',
  },
  recording: {
    parentMenu: 'Recording',
    href: '/recording',
  },
  kycReport: {
    parentMenu: 'Report',
    href: '/report/kyc',
  },
  abandonCallReport: {
    parentMenu: 'Report',
    href: '/report/abandon-call',
  },
  dailySummaryReport: {
    parentMenu: 'Report',
    href: '/report/daily-summary',
  },
  campaign: {
    parentMenu: 'Campaign',
    href: '/campaign',
  },
  channel: {
    parentMenu: 'Channel',
    href: '/channel',
  },
  serverConfiguration: {
    parentMenu: 'Server Configuration',
    href: '/server-configuration',
  },
  jingleVideo: {
    parentMenu: 'Video Jingle',
    href: '/jingle-video',
  },
  login: {
    parentMenu: null,
    href: '/login',
  },
  register: {
    parentMenu: null,
    href: '/register',
  },
  forgotPassword: {
    parentMenu: null,
    href: '/forgot-password',
  },
  workHour: {
    parentMenu: 'Working Times Management',
    href: '/work-hour',
  },
  holiday: {
    parentMenu: 'Working Times Management',
    href: '/holiday',
  },
  notFound: {
    parentMenu: null,
    href: '/404',
  },
  internalServerError: {
    parentMenu: null,
    href: '/500',
  },
};

export const colors = {
  dark: '#000',
};

export const Roles = {
  admin: 'Administrator',
  operator: 'Operation',
  reporter: 'Reporting',
};

export const userMenuAccess: UserMenuAccess = {
  Administrator: [
    'Dashboard',
    'Server Configuration',
    'User Management',
    'Channel',
    'Video Jingle',
    'Working Times Management',
    'Campaign',
  ],
  Operation: [
    'Channel',
    'Video Jingle',
    'Working Times Management',
    'Campaign',
  ],
  Reporting: ['Recording', 'Report'],
};

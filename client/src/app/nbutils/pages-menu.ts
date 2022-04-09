import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FinBoard',
    icon: 'home-outline',
    link: '/pages/_dashboard',
  },
  {
    title: 'RESOURCES',
    group: true,
  },
  {
    title: 'Accounts',
    icon: 'book-outline',
    children: [
      {
        title: 'Account management',
        link: '/account',
      },
      {
        title: 'Moves',
        link: '/account/moves',
      },
    ],
  },
  {
    title: 'Investments',
    icon: 'trending-up-outline',
    children: [
      {
        title: 'Investment management',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Moves',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Retirement',
    icon: 'shield-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Retirement management',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Moves',
        link: '/pages/ui-features/icons',
      },
    ],
  },
  {
    title: 'Cash',
    icon: 'bar-chart-2-outline',
    children: [
      {
        title: 'Cash management',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Moves',
        link: '/pages/modal-overlays/window',
      },
    ],
  },
  {
    title: 'Crypto',
    icon: 'award-outline',
    children: [
      {
        title: 'Crypto management',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Moves',
        link: '/pages/extra-components/progress-bar',
      },
    ],
  },
  {
    title: 'PROFILE',
    group: true,
  },
  {
    title: 'My profile',
    icon: 'person-outline',
    children: [
      {
        title: 'Profile management',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
    ],
  },
];

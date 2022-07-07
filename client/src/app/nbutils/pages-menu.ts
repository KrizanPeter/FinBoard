import { NbMenuItem } from '@nebular/theme';

export const USER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'browser-outline',
    link: 'dashboard',
  },
  {
    title: 'Management',
    group: true,
  },
  {
    title: 'Resources',
    icon: 'keypad-outline',
    link: 'resource',
  },
  {
    title: 'Resource groups',
    icon: 'grid-outline',
    link: 'snapshot',
  },
  {
    title: 'Snapshots',
    icon: 'checkmark-outline',
    link: 'snapshot',
  },
  {
    title: 'Agregate snapshot',
    icon: 'done-all-outline',
    link: 'agregate-snapshot',
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

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'What is Finboard?',
    icon: 'home-outline',
    link: '/pages/_dashboard',
  },
  {
    title: 'How to use Finboard?',
    icon: 'book-outline',
  },
  {
    title: 'About me',
    icon: 'trending-up-outline',
  },
  {
    title: 'PROFILE',
    group: true,
  },
  {
    title: 'Login',
    icon: 'person-outline',
  },
];

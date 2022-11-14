import { NbMenuItem } from '@nebular/theme';

export const USER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'browser-outline',
    link: 'dashboard',
  },
  {
    title: 'Create scheme',
    icon: 'checkmark-square-outline',
    link: 'create-guide',
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
    link: 'resource-group',
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
        link: 'login',
      },
      {
        title: 'Register',
        link: 'login',
      },
    ],
  },
];

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    group: true,
  },
  {
    title: 'What is Finboard?',
    icon: 'home-outline',
    link: 'landing-page',
  },
  {
    title: 'How to use Finboard?',
    icon: 'book-outline',
    link: 'how-to-use',
  },
  {
    title: 'Release notes',
    group: true,
  },
  {
    title: 'What is new?',
    icon: 'trending-up-outline',
    link: 'release-notes',
  },
  {
    title: 'Profile',
    group: true,
  },
  {
    title: 'Login',
    icon: 'person-outline',
    link: 'login',
  },
];

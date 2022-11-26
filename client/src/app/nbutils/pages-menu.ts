import { NbMenuItem } from '@nebular/theme';

export const USER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'browser-outline',
    link: 'dashboard',
  },
  {
    title: 'Add snapshot',
    icon: 'done-all-outline',
    link: 'agregate-snapshot',
  },
  {
    title: 'Manage portfolio',
    icon: 'checkmark-square-outline',
    link: 'create-guide',
  },
  {
    title: 'Settings',
    group: true,
  },
  {
    title: 'Data overview',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Snapshots',
        icon: 'checkmark-outline',
        link: 'snapshot',
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
      }
    ]
  },
  {
    title: 'Public',
    group: true,
  },
  {
    title: 'Public pages',
    icon: 'person-outline',
    children: [
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

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
    icon: 'layers-outline',
    link: 'resource',
  },
  {
    title: 'Snapshots',
    icon: 'done-all-outline',
    link: 'snapshot',
  },
  {
    title: 'My resources',
    group: true,
  },
  {
    title: 'Resources',
    icon: 'book-outline',
    children: [
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
    ],
  },
  {
    title: 'Groups',
    icon: 'trending-up-outline',
    children: [
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
      },
      {
        title: ' Example1',
        link: '/account',
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

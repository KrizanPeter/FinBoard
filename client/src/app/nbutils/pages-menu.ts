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
    title: 'Resources',
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
    title: 'Moves',
    icon: 'trending-up-outline',
    children: [
      {
        title: 'Moves management',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Moves',
        link: '/pages/forms/layouts',
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

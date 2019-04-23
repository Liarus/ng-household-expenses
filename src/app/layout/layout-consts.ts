import { MenuItem } from './models/menuItem.model';

export const Menu: MenuItem[] = [
  {
    url: '/households',
    title: 'Households',
    icon: 'home',
    permissions: ['CanSeeHouseholds']
  },
  {
    url: '/expenses',
    title: 'Expenses',
    icon: 'payment',
    permissions: ['CanSeeExpenses']
  },
  {
    url: '/savings',
    title: 'Savings',
    icon: 'drafts',
    permissions: ['CanSeeSavings']
  },
  {
    url: '/settings',
    title: 'Settings',
    icon: 'settings',
    permissions: ['CanSeeSettings']
  },
  {
    url: '/users',
    title: 'Users',
    icon: 'group',
    permissions: ['CanSeeUsers']
  }
];

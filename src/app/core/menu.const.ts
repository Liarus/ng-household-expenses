import { MenuItem } from './models/menuItem.model';

export const Menu: MenuItem[] = [
    {
        url: '/app-households',
        title: 'Households',
        icon: 'home',
        permissions: ['CanSeeHouseholds']
    },
    {
        url: '/app-expenses',
        title: 'Expenses',
        icon: 'payment',
        permissions: ['CanSeeExpenses']
    },
    {
        url: '/app-savings',
        title: 'Savings',
        icon: 'drafts',
        permissions: ['CanSeeSavings']
    },
    {
        url: '/app-settings',
        title: 'Settings',
        icon: 'settings',
        permissions: ['CanSeeSettings']
    },
    {
        url: '/app-users',
        title: 'Users',
        icon: 'group',
        permissions: ['CanSeeUsers']
    }
];

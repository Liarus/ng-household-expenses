/// <reference types="jest" />

import {
  getIsSidebarExpanded,
  getWindowWidth,
  getWindowHeight,
  getMenuItems,
  getIsMobile
} from './';
import { MenuItem } from '../../models/menuItem.model';

describe('Layout Selectors', () => {
  describe('getIsSidebarExpanded', () => {
    it('should return if sidebar expanded', () => {
      const expectedIsExpanded = true;
      const state = {
        layout: {
          isSidebarExpanded: expectedIsExpanded
        }
      };

      expect(getIsSidebarExpanded(state)).toBe(expectedIsExpanded);
    });
  });

  describe('getWindowWidth', () => {
    it('should return windows width', () => {
      const expectedWidth = 800;
      const state = {
        layout: {
          windowWidth: expectedWidth
        }
      };

      expect(getWindowWidth(state)).toBe(expectedWidth);
    });
  });

  describe('getWindow', () => {
    it('should return windows height', () => {
      const expectedHeight = 600;
      const state = {
        layout: {
          windowHeight: expectedHeight
        }
      };

      expect(getWindowHeight(state)).toBe(expectedHeight);
    });
  });

  describe('getIsMobile', () => {
    it('should return if mobile', () => {
      const expectedIsMobile = true;
      const state = {
        layout: {
          isMobile: expectedIsMobile
        }
      };

      expect(getIsMobile(state)).toBe(expectedIsMobile);
    });
  });

  describe('getMenuItems', () => {
    it('should return menu items', () => {
      const expectedItems: MenuItem[] = [
        {
          url: '/',
          title: 'Log in',
          icon: 'power_settings_new',
          permissions: [],
          hidden: false
        },
        {
          url: '/Test',
          title: 'Test',
          icon: 'test',
          permissions: ['Test permission'],
          hidden: true
        },
        {
          url: '/Test2',
          title: 'Test2',
          icon: 'test2',
          permissions: ['Test permission', 'Test permission2'],
          hidden: true
        }
      ];
      const state = {
        layout: {
          menuItems: expectedItems
        }
      };

      expect(getMenuItems(state)).toBe(expectedItems);
    });
  });
});

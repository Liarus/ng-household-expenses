/// <reference types="jest" />

import {
  getIsSidebarExpanded,
  getWindowWidth,
  getWindowHeight,
  getMenuItems,
  getIsMobile
} from './layout.selectors';
import { MenuItem } from '../../models/menuItem.model';
import { TEST_DATA } from '../../../shared/tests/test-data';

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
      const expectedItems = TEST_DATA.layout.menuItems as MenuItem[];
      const state = {
        layout: {
          menuItems: expectedItems
        }
      };

      expect(getMenuItems(state)).toBe(expectedItems);
    });
  });
});

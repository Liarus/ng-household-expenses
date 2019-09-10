import {
  getIsSidebarExpanded,
  getWindowWidth,
  getWindowHeight,
  getMenuItems,
  getIsMobile
} from './layout.selectors';
import { TEST_DATA } from '../../../shared/tests/test-data';
import { State } from '../reducers/layout.reducer';

describe('Layout Selectors', () => {
  const layoutState: State = {
    isSidebarExpanded: true,
    windowHeight: 600,
    windowWidth: 800,
    isMobile: true,
    menuItems: TEST_DATA.layout.menuItems
  };

  const state = {
    layout: layoutState
  };

  describe('getIsSidebarExpanded', () => {
    it('should return if sidebar expanded', () => {
      const expected = true;

      expect(getIsSidebarExpanded(state)).toBe(expected);
    });
  });

  describe('getWindowWidth', () => {
    it('should return windows width', () => {
      const expected = 800;

      expect(getWindowWidth(state)).toBe(expected);
    });
  });

  describe('getWindow', () => {
    it('should return windows height', () => {
      const expected = 600;

      expect(getWindowHeight(state)).toBe(expected);
    });
  });

  describe('getIsMobile', () => {
    it('should return if mobile', () => {
      const expected = true;

      expect(getIsMobile(state)).toBe(expected);
    });
  });

  describe('getMenuItems', () => {
    it('should return menu items', () => {
      const expected = TEST_DATA.layout.menuItems;

      expect(getMenuItems(state)).toBe(expected);
    });
  });
});

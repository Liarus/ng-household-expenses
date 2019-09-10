import { reducer, initialState } from './layout.reducer';
import { WindowSize } from '../../models/windowSize.model';
import { MenuItem } from '../../models/menuItem.model';
import * as LayoutActions from '../actions/layout.actions';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('LayoutReducer', () => {
  describe('undefined action', () => {
   it('should retun defult state', () => {
      const action = { type: 'NOOP' } as any;

      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('LayoutAction.openSidebar', () => {
    it('should set sidebar as opened', () => {
      const action = LayoutActions.openSidebar();

      const result = reducer(initialState, action);

      expect(result).toEqual({
       ...initialState,
       isSidebarExpanded: true
      });
    });
  });

  describe('LayoutActions.closeSidebar', () => {
    it('should set sidebar as closed', () => {
      const action = LayoutActions.closeSidebar();

      const result = reducer({
        ...initialState,
        isSidebarExpanded: true
      }, action);

       expect(result).toEqual({
        ...initialState,
        isSidebarExpanded: false
      });
    });
  });

  describe('LayoutActions.toggleSidebar', () => {
    it('should set sidebar as closed', () => {
      const action = LayoutActions.toggleSidebar();

      const result = reducer({
        ...initialState,
        isSidebarExpanded: true
      }, action);

       expect(result).toEqual({
        ...initialState,
        isSidebarExpanded: false
      });
    });
  });

  describe('LayoutActions.windowResized', () => {
    it('should set mobile and close sidebar', () => {
      const request: WindowSize = {
        height: 400,
        width: 200
      };
      const action = LayoutActions.windowResized({ result: request});

      const result = reducer({
        ...initialState,
        isSidebarExpanded: true
      }, action);

       expect(result).toEqual({
        ...initialState,
        isSidebarExpanded: false,
        isMobile: true,
        windowHeight: request.height,
        windowWidth: request.width
      });
    });

    it('should leave sidebar and clear mobile', () => {
      const request: WindowSize = {
        height: 600,
        width: 800
      };
      const action = LayoutActions.windowResized({ result: request});

      const result = reducer({
        ...initialState,
        isSidebarExpanded: false,
        isMobile: true
      }, action);

       expect(result).toEqual({
        ...initialState,
        isSidebarExpanded: false,
        isMobile: false,
        windowHeight: request.height,
        windowWidth: request.width
      });
    });
  });

  describe('LayoutActions.applyMenuItems', () => {
    it('should set menu items', () => {
      const items = TEST_DATA.layout.menuItems as MenuItem[];
      const action = LayoutActions.applyMenuItems({ items });
      const result = reducer(initialState, action);

       expect(result).toEqual({
        ...initialState,
        menuItems: items
      });
    });
  });
});

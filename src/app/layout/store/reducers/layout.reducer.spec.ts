/// <reference types="jest" />

import { reducer, initialState } from './layout.reducer';
import { WindowSize } from '../../models/windowSize.model';
import { MenuItem } from '../../models/menuItem.model';
import {
  OpenSidebar,
  CloseSidebar,
  ToggleSidebar,
  ResizeWindow,
  ApplyMenuItems
} from '../actions/layout.actions';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('LayoutReducer', () => {
  describe('undefined action', () => {
   it('should retun defult state', () => {
      const action = {type: 'NOOP'} as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('LayoutActionTypes.OpenSidebar', () => {
    it('should set sidebar as opened', () => {
      const action = new OpenSidebar();
      const result = reducer(initialState, action);

      expect(result).toEqual({
       ...initialState,
       isSidebarExpanded: true
      });
    });
  });

  describe('LayoutActionTypes.CloseSidebar', () => {
    it('should set sidebar as closed', () => {
      const action = new CloseSidebar();
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

  describe('LayoutActionTypes.ToggleSidebar', () => {
    it('should set sidebar as closed', () => {
      const action = new ToggleSidebar();
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

  describe('LayoutActionTypes.ResizeWindow', () => {
    it('should set mobile and close sidebar', () => {
      const request: WindowSize = {
        height: 400,
        width: 200
      };
      const action = new ResizeWindow(request);
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
      const action = new ResizeWindow(request);
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

  describe('LayoutActionTypes.ApplyMenuItems', () => {
    it('should set menu items', () => {
      const request = TEST_DATA.layout.menuItems as MenuItem[];
      const action = new ApplyMenuItems(request);
      const result = reducer(initialState, action);

       expect(result).toEqual({
        ...initialState,
        menuItems: request
      });
    });
  });
});

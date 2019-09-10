import { createReducer, on, Action } from '@ngrx/store';

import * as LayoutActions from '../actions/layout.actions';
import { MenuItem } from '../../models/menuItem.model';

export interface State {
  isSidebarExpanded: boolean;
  windowHeight: number;
  windowWidth: number;
  isMobile: boolean;
  menuItems: MenuItem[];
}

export const initialState: State = {
  isSidebarExpanded: false,
  windowHeight: window.screen.height,
  windowWidth: window.screen.width,
  isMobile: window.screen.width < 768,
  menuItems: [{
    url: '/',
    title: 'Log in',
    icon: 'power_settings_new',
    permissions: [],
    hidden: false
  }]
};

export const layoutReducer = createReducer(
  initialState,
  on(LayoutActions.openSidebar, state => ({
    ...state,
    isSidebarExpanded: true
  })),
  on(LayoutActions.closeSidebar, state => ({
    ...state,
    isSidebarExpanded: false
  })),
  on(LayoutActions.toggleSidebar, state => ({
    ...state,
    isSidebarExpanded: !state.isSidebarExpanded
  })),
  on(LayoutActions.windowResized, (state, { result }) => {
    const isMobile = result.width < 768;
    const isExpanded = isMobile ? false : state.isSidebarExpanded;
    return {
      ...state,
      windowHeight: result.height,
      windowWidth: result.width,
      isMobile: isMobile,
      isSidebarExpanded: isExpanded
    };
  }),
  on(LayoutActions.applyMenuItems, (state, { items }) => ({
    ...state,
    menuItems: items
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return layoutReducer(state, action);
}

export const getIsSidebarExpanded = (state: State) => state.isSidebarExpanded;
export const getWindowWidth = (state: State) => state.windowWidth;
export const getWindowHeight = (state: State) => state.windowHeight;
export const getMenuItems = (state: State) => state.menuItems;
export const getIsMobile = (state: State) => state.isMobile;

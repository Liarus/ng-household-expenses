import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLayout from './layout.reducer';

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getIsSidebarExpanded = createSelector(
  getLayoutState,
  fromLayout.getIsSidebarExpanded
);

export const getWindowWidth = createSelector(
  getLayoutState,
  fromLayout.getWindowWidth
);

export const getWindowHeight = createSelector(
  getLayoutState,
  fromLayout.getWindowHeight
);

export const getMenuItems = createSelector(
  getLayoutState,
  fromLayout.getMenuItems
);

export const getIsMobile = createSelector(
  getLayoutState,
  fromLayout.getIsMobile
);

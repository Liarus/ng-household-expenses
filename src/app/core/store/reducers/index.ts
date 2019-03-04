import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLayout from './layout.reducer';
import * as fromRoot from '../../../store/reducers';

export interface CoreState {
  layout: fromLayout.State;
}

export interface State extends fromRoot.State {
  core: CoreState;
}

export const reducers: ActionReducerMap<CoreState> = {
  layout: fromLayout.reducer
};

export const getCoreState = createFeatureSelector<CoreState>('core');

export const getLayoutState = createSelector(
  getCoreState,
  (state: CoreState) => state.layout
);

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

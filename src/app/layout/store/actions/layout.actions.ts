import { createAction, props } from '@ngrx/store';

import { WindowSize } from '../../models/windowSize.model';
import { MenuItem } from '../../models/menuItem.model';

export const openSidebar = createAction(
  '[Layout] Open Sidebar',
);

export const closeSidebar = createAction(
  '[Layout] Close Sidebar',
);

export const toggleSidebar = createAction(
  '[Layout] Toggle Sidebar',
);

export const windowResized = createAction(
  '[Layout/API] Window Resized',
  props<{ result: WindowSize }>()
);

export const applyMenuItems = createAction(
  '[Layout/API] Apply Menu Items',
  props<{ items: MenuItem[] }>()
);

export const refreshMenuItems = createAction(
  '[Layout/API] Refresh Menu Items',
);

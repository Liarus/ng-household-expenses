import { Action } from '@ngrx/store';

import { WindowSize } from '../../models/windowSize.model';
import { MenuItem } from '../../models/menuItem.model';

export enum LayoutActionTypes {
  OpenSidebar = '[Layout] Open Sidebar',
  CloseSidebar = '[Layout] Close Sidebar',
  ToggleSidebar = '[Layout] Toggle Sidebar',
  ResizeWindow = '[Layout API] Resize window',
  ApplyMenuItems = '[Layout API] Set Menu Items',
  RefreshMenuItems = '[Layout API] Refresh Menu Items'
}

export class OpenSidebar implements Action {
  readonly type = LayoutActionTypes.OpenSidebar;
}

export class CloseSidebar implements Action {
  readonly type = LayoutActionTypes.CloseSidebar;
}

export class ToggleSidebar implements Action {
  readonly type = LayoutActionTypes.ToggleSidebar;
}

export class ResizeWindow implements Action {
  readonly type = LayoutActionTypes.ResizeWindow;

  constructor(public payload: WindowSize) {}
}

export class ApplyMenuItems implements Action {
  readonly type = LayoutActionTypes.ApplyMenuItems;

  constructor(public payload: MenuItem[]) {}
}

export class RefreshMenuItems implements Action {
  readonly type = LayoutActionTypes.RefreshMenuItems;
}

export type LayoutActionsUnion =
  | OpenSidebar
  | CloseSidebar
  | ToggleSidebar
  | ResizeWindow
  | ApplyMenuItems
  | RefreshMenuItems;

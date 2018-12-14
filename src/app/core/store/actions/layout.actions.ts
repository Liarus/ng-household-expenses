import { Action } from '@ngrx/store';

import { WindowSize } from '../../models/windowSize.model';

export enum LayoutActionTypes {
    OpenSidebar = '[Layout] Open Sidebar',
    CloseSidebar = '[Layout] Close Sidebar',
    ToggleSidebar = '[Layout] Toggle Sidebar',
    ResizeWindow = '[Layout API] Resize window'
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

export type LayoutActionsUnion =
    | OpenSidebar
    | CloseSidebar
    | ToggleSidebar
    | ResizeWindow;

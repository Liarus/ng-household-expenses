import { LayoutActionTypes, LayoutActionsUnion } from '../actions/layout.actions';
import { MenuItem } from '../../models/menuItem.model';

export interface State {
    isSidebarExpanded: boolean;
    windowHeight: number;
    windowWidth: number;
    menuItems: MenuItem[];
}

export const initialState: State = {
    isSidebarExpanded: false,
    windowHeight: window.screen.height,
    windowWidth: window.screen.width,
    menuItems: [{
        url: '/',
        title: 'Log in',
        icon: 'power_settings_new',
        permissions: [],
        hidden: false
    }]
};

export function reducer(
    state = initialState,
    action: LayoutActionsUnion): State {
    switch (action.type) {
        case LayoutActionTypes.OpenSidebar: {
            return {
                ...state,
                isSidebarExpanded: true
            };
        }

        case LayoutActionTypes.CloseSidebar: {
            return {
                ...state,
                isSidebarExpanded: false
            };
        }

        case LayoutActionTypes.ToggleSidebar: {
            return {
                ...state,
                isSidebarExpanded: !state.isSidebarExpanded
            };
        }

        case LayoutActionTypes.ResizeWindow: {
            const isMobile: boolean = action.payload.width < 768 ? true : false;
            const expanded: boolean = isMobile ? false : state.isSidebarExpanded;
            return {
                ...state,
                windowHeight: action.payload.height,
                windowWidth: action.payload.width,
                isSidebarExpanded: expanded
            };
        }

        case LayoutActionTypes.ApplyMenuItems: {
            return {
                ...state,
                menuItems: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getIsSidebarExpanded = (state: State) => state.isSidebarExpanded;
export const getWindowWidth = (state: State) => state.windowWidth;
export const getWindowHeight = (state: State) => state.windowHeight;
export const getMenuItems = (state: State) => state.menuItems;
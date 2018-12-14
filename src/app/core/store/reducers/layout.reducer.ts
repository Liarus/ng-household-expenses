import { LayoutActionTypes, LayoutActionsUnion } from '../actions/layout.actions';

export interface State {
    isSidebarExpanded: boolean;
    windowHeight: number;
    windowWidth: number;
}

export const initialState: State = {
    isSidebarExpanded: false,
    windowHeight: window.screen.height,
    windowWidth: window.screen.width
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

        default: {
            return state;
        }
    }
}

export const getIsSidebarExpanded = (state: State) => state.isSidebarExpanded;
export const getWindowWidth = (state: State) => state.windowWidth;
export const getWindowHeight = (state: State) => state.windowHeight;

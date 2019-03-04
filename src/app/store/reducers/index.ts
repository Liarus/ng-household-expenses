import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
import { RouterStateUrl } from '../../shared/helpers/routerState';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

export function logout(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): any => {
    if (action.type === '[Auth] Logout') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze, logout]
  : [logout];


import { ActionReducerMap, ActionReducer, MetaReducer, Action } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { InjectionToken } from '@angular/core';

import { environment } from '../../../environments/environment';
import { RouterStateUrl } from './router.reducer';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer
};

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>>
  ('Root reducers token', {
  factory: () => ({
    router: fromRouter.routerReducer
  }),
});

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
  ? [logger, logout]
  : [logout];

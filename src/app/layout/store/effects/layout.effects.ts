import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap, debounceTime } from 'rxjs/operators';

import { MenuService } from '../../services/menu.service';
import { LayoutActionTypes, ApplyMenuItems } from '../actions/layout.actions';
import { MenuItem } from '../../models/menuItem.model';
import { fromEvent } from 'rxjs';
import { ResizeWindow } from '../actions/layout.actions';

@Injectable()
export class LayoutEffects {
  @Effect()
  menuItem$ = this.actions$.pipe(
    ofType(LayoutActionTypes.RefreshMenuItems),
    switchMap(() => {
      return this.menuService.getMenuItems()
      .pipe(
        map((menu: MenuItem[]) => new ApplyMenuItems(menu))
      );
    })
  );

  @Effect()
  resize$ = fromEvent(window, 'resize').pipe(
    debounceTime(300),
    map((event: any) => new ResizeWindow({
      width: event.target.innerWidth,
      height: event.target.innerHeight
    }))
  );

  constructor(
    private actions$: Actions,
    private menuService: MenuService
  ) {}
}

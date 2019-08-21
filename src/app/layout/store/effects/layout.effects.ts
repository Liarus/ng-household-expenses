import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap } from 'rxjs/operators';

import { MenuService } from '../../services/menu.service';
import { LayoutActionTypes, ApplyMenuItems } from '../actions/layout.actions';
import { MenuItem } from '../../models/menuItem.model';

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

  constructor(
    private actions$: Actions,
    private menuService: MenuService
  ) {}
}

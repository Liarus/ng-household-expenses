import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { MenuService } from '../../services/menu.service';
import * as LayoutActions from '../actions/layout.actions';

@Injectable()
export class LayoutEffects {

  menuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LayoutActions.refreshMenuItems),
      switchMap(() =>
        this.menuService.getMenuItems().pipe(
          map(items => LayoutActions.applyMenuItems({ items }))
        )
      )
    )
  );

  resize$ = createEffect(() =>
    fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map((event: any) => LayoutActions.windowResized({ result: {
        width: event.target.innerWidth,
        height: event.target.innerHeight
      }}))
    )
  );

  constructor(
    private actions$: Actions,
    private menuService: MenuService
  ) {}
}

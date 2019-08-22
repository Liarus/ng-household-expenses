import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { MenuItem } from '../models/menuItem.model';
import * as fromAuth from '../../auth/store/reducers/auth.reducer';
import * as fromAuthSelectors from '../../auth/store/selectors/auth.selectors';
import { Menu } from '../layout-consts';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
  private baseMenu = Menu;
  private isUserLoggedIn$ = this.store.pipe(select(fromAuthSelectors.getLoggedIn));

  constructor(private store: Store<fromAuth.State>) {  }

  public getMenuItems(): Observable<MenuItem[]> {
    return this.isUserLoggedIn$.pipe(map((isLoggedIn: boolean) => {
      return this.convertBaseMenu(isLoggedIn);
    }));
  }

  private convertBaseMenu(isLoggedId: boolean): MenuItem[] {
    let menu = [];
    if (!isLoggedId) {
      menu = [{
        url: '/login',
        title: 'Log in',
        icon: 'power_settings_new',
        permissions: [],
        hidden: false
      }];
    } else {
      menu = this.baseMenu.map((item: MenuItem) => {
        return Object.assign({}, item, { hidden: false });
      });
    }

    return menu;
  }
}

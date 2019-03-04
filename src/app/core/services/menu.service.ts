import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Menu } from '../menu.const';
import { MenuItem } from '../models/menuItem.model';
import * as fromAuth from '../../auth/store/reducers';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
  private baseMenu = Menu;
  private isUserLoggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

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
        url: '/',
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

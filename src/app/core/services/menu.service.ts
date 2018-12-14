import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Menu } from '../menu.const';
import { MenuItem } from '../models/menuItem.model';
import * as fromAuth from '../../auth/store/reducers';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    baseMenu = Menu;
    isUserLoggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

    constructor(private store: Store<fromAuth.State>) {  }

    public getMenuItems(): Observable<MenuItem[]> {
        return this.isUserLoggedIn$.pipe(map((isLoggedIn: boolean) => {
            return isLoggedIn ? this.convertBaseMenu() : [];
        }));
    }

    private convertBaseMenu(): MenuItem[] {
        let menu = this.baseMenu.map((item: MenuItem) => {
            return Object.assign({}, item, { hidden: false });
        });

        if (!menu || menu.length === 0) {
            menu = [{
                url: '/',
                title: 'Log in',
                icon: 'power_settings_new',
                permissions: [],
                hidden: false
            }];
        }
        return menu;
    }
}

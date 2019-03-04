/// <reference types="jest" />
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';

import { LayoutEffects } from './layout.effects';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../models/menuItem.model';
import { RefreshMenuItems, ApplyMenuItems } from '../actions/layout.actions';

describe('LayoutEffects', () => {
  let effects: LayoutEffects;
  let actions$: Observable<any>;
  let menuService: MenuService;

  const menuItems = [
    {
      url: '/1',
      title: 'menuTitle1',
      icon: 'home',
      permissions: ['CanSeeUsers'],
      hidden: false
    },
    {
      url: '/2',
      title: 'menuTitle2',
      icon: 'home',
      permissions: ['CanSeeUsers'],
      hidden: false
    },
    {
      url: '/3',
      title: 'menuTitle3',
      icon: 'home',
      permissions: ['CanSeeUsers'],
      hidden: false
    }
  ] as MenuItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayoutEffects,
        {
          provide: MenuService,
          useValue: {
            getMenuItems: jest.fn()
          }
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LayoutEffects);
    actions$ = TestBed.get(Actions);
    menuService = TestBed.get(MenuService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('menuItem$', () => {
    it('should return ApplyMenuItems on RefreshMenuItems', () => {
      const action = new RefreshMenuItems();
      const completion = new ApplyMenuItems(menuItems);

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: menuItems });
      const expected = cold('--b', { b: completion });
      menuService.getMenuItems = jest.fn(() => response);

      expect(effects.menuItem$).toBeObservable(expected);
    });
  });
});

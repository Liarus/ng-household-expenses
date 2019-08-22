/// <reference types="jest" />
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';

import { LayoutEffects } from './layout.effects';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../models/menuItem.model';
import { RefreshMenuItems, ApplyMenuItems, ResizeWindow } from '../actions/layout.actions';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('LayoutEffects', () => {
  let effects: LayoutEffects;
  let actions$: Observable<any>;
  let menuService: MenuService;

  const menuItems = TEST_DATA.layout.menuItems as MenuItem[];

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

  // describe('', () => {
  //   it('should dispatch ResizeWindow action', () => {
  //     const width = window.innerWidth;
  //     const height = window.innerHeight;
  //     const completion = new ResizeWindow({
  //       width: width,
  //       height: height
  //     });
  //     const action = new Event('resize');

  //     actions$ = hot('-a---', { a: action });
  //     const expected =  cold('--b', { b: completion });

  //     expect(effects.resize$).toBeObservable(expected);
  //   });
  // });
});

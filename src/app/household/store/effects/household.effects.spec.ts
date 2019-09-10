import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { hot, cold } from 'jasmine-marbles';
import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Household } from '../../models/household.model';
import { HouseholdService } from '../../services/household.service';
import { HouseholdEffects } from './household.effects';
import * as HouseholdActions from '../actions/household.actions';
import * as fromHousehold from '../reducers/household.reducer';
import * as fromHouseholdSelectors from '../selectors/household.selectors';
import * as fromLayout from '../../../layout/store/reducers/layout.reducer';
import * as fromLayoutSelectors from '../../../layout/store/selectors/layout.selectors';
import * as fromAuth from '../../../auth/store/reducers/auth.reducer';
import * as fromAuthSelectors from '../../../auth/store/selectors/auth.selectors';
import { HouseholdFilter } from '../../models/householdFilter.model';
import { User } from '../../../auth/models/user.model';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('HouseholdEffects', () => {
  let effects: HouseholdEffects;
  let actions$: Observable<any>;
  let dialog: any;
  let toastrService: any;
  let householdService: HouseholdService;
  let store: MockStore<fromHousehold.State>;
  let getIsMobile: MemoizedSelector<fromLayout.State, boolean>;
  let getLoggedUser: MemoizedSelector<fromAuth.State, User>;
  let getHouseholdFilter: MemoizedSelector<fromHousehold.State, HouseholdFilter>;
  let getHousehold: MemoizedSelector<fromHousehold.State, Household>;
  const testState = {
    households: {
    entities: {
      'id': {
      }
    }
  }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HouseholdEffects,
        {
          provide: HouseholdService,
          useValue: {
            getAllForUser: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          }
        },
        {
          provide: ToastrService,
          useValue: {
            error: jest.fn()
          }
        },
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn(),
          }
        },
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: testState
        })
      ]
    });

    effects = TestBed.get(HouseholdEffects);
    actions$ = TestBed.get(Actions);
    toastrService = TestBed.get(ToastrService);
    householdService = TestBed.get(HouseholdService);
    dialog = TestBed.get(MatDialog);
    store = TestBed.get(Store);
    getIsMobile = store.overrideSelector(
      fromLayoutSelectors.getIsMobile,
      false
    );
    getLoggedUser = store.overrideSelector(
      fromAuthSelectors.getLoggedUser,
      TEST_DATA.auth.user
    );
    getHouseholdFilter = store.overrideSelector(
      fromHouseholdSelectors.getHouseholdFilter,
      TEST_DATA.household.filter
    );
    getHousehold = store.overrideSelector(
      fromHouseholdSelectors.getHousehold('550416ea-b523-4468-ae10-ea07d35eb9f0'),
      {
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      } as Household
    );
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('addHousehold$', () => {
    it('should return addHouseholdSuccess on addHousehold when success', () => {
      const household = TEST_DATA.household.household;
      const action = HouseholdActions.addHousehold({ request: {
        userId: TEST_DATA.auth.userId,
        id: household.id,
        name: household.name,
        symbol: household.symbol,
        description: household.description,
        street: household.street,
        city: household.city,
        country: household.country,
        zipCode: household.zipCode,
        version: household.version
      }});
      const completion = HouseholdActions.addHouseholdSuccess({ response: { householdId: household.id }});

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: of(true) });
      const expected = cold('--b', { b: completion });
      householdService.create = jest.fn(() => response);

      expect(effects.addHousehold$).toBeObservable(expected);
    });

    it('should return addHouseholdFail on addHousehold when error', () => {
      const error = {
        message: 'error occured'
      };
      const action = HouseholdActions.addHousehold({ request: {
        userId: TEST_DATA.auth.userId,
        id: TEST_DATA.household.household.id,
        name: TEST_DATA.household.household.name,
        symbol: TEST_DATA.household.household.symbol,
        description: TEST_DATA.household.household.description,
        street: TEST_DATA.household.household.street,
        city: TEST_DATA.household.household.city,
        country: TEST_DATA.household.household.country,
        zipCode: TEST_DATA.household.household.zipCode,
        version: TEST_DATA.household.household.version
      }});
      const completion = HouseholdActions.addHouseholdFail({ error });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      householdService.create = jest.fn(() => response);

      expect(effects.addHousehold$).toBeObservable(expected);
    });
  });

  describe('updateHousehold$', () => {
    it('should return updateHouseholdSuccess on updateHousehold when success', () => {
      const household = TEST_DATA.household.household;
      const action = HouseholdActions.updateHousehold({ request: {
        id: household.id,
        name: household.name,
        symbol: household.symbol,
        description: household.description,
        street: household.street,
        city: household.city,
        country: household.country,
        zipCode: household.zipCode,
        version: household.version
      }});
      const completion = HouseholdActions.updateHouseholdSuccess({ response: { householdId: household.id } });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: of(true) });
      const expected = cold('--b', { b: completion });
      householdService.update = jest.fn(() => response);

      expect(effects.updateHousehold$).toBeObservable(expected);
    });

    it('should return updateHouseholdFail on updateHousehold when error', () => {
      const error = {
        message: 'error occured'
      };
      const action = HouseholdActions.updateHousehold({ request: {
        id: TEST_DATA.household.household.id,
        name: TEST_DATA.household.household.name,
        symbol: TEST_DATA.household.household.symbol,
        description: TEST_DATA.household.household.description,
        street: TEST_DATA.household.household.street,
        city: TEST_DATA.household.household.city,
        country: TEST_DATA.household.household.country,
        zipCode: TEST_DATA.household.household.zipCode,
        version: TEST_DATA.household.household.version
      }});
      const completion = HouseholdActions.updateHouseholdFail({ error });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      householdService.update = jest.fn(() => response);

      expect(effects.updateHousehold$).toBeObservable(expected);
    });
  });

  describe('deleteHousehold$', () => {
    it('should return removeHouseholdSuccess on removeHousehold when success', () => {
      const request = {
        householdId: TEST_DATA.household.household.id
      };
      const action = HouseholdActions.removeHousehold({ request });
      const completion = HouseholdActions.removeHouseholdSuccess({ response: { householdId: request.householdId }});

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: of(true) });
      const expected = cold('--b', { b: completion });
      householdService.delete = jest.fn(() => response);

      expect(effects.deleteHousehold$).toBeObservable(expected);
    });

    it('should return removeHouseholdFail on removeHousehold when error', () => {
      const error = {
        message: 'error occured'
      };
      const action = HouseholdActions.removeHousehold({ request: { householdId: TEST_DATA.household.household.id } });
      const completion = HouseholdActions.removeHouseholdFail({ error });

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      householdService.delete = jest.fn(() => response);

      expect(effects.deleteHousehold$).toBeObservable(expected);
    });
  });

  describe('initHouseholds', () => {
    it('should applyFilter with appendData if mobile', () => {
      getIsMobile.setResult(true);
      const action = HouseholdActions.initHouseholds();
      const completion = HouseholdActions.applyFilter({ request: {
        pageNumber: 1,
        pageSize: 10,
        sortingField: 'name',
        sortDirection: 'asc',
        appendData: true
      }});

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.initHouseholds$).toBeObservable(expected);
    });

    it('should applyFilter with no appendData if desktop', () => {
      const action = HouseholdActions.initHouseholds();
      const completion = HouseholdActions.applyFilter({ request: {
        appendData: false
      }});

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.initHouseholds$).toBeObservable(expected);
    });
  });

  describe('loadHouseholds$', () => {
    it('should return loadHouseholdsSuccess with households on loadHouseholds when success', () => {
      const households = TEST_DATA.household.households;
      const action = HouseholdActions.loadHouseholds();
      const completion = HouseholdActions.loadHouseholdsSuccess({ response: {
        count: households.length,
        households: households
      }});

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: { count: households.length, households: households } });
      const expected = cold('--b', { b: completion });
      householdService.getAllForUser = jest.fn(() => response);

      expect(effects.loadHouseholds$).toBeObservable(expected);
    });

    it('should return loadHouseholdsFail on loadHouseholds when error', () => {
      const error = {
        message: 'error occured'
      };
      const action = HouseholdActions.loadHouseholds();
      const completion = HouseholdActions.loadHouseholdsFail({ error });

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      householdService.getAllForUser = jest.fn(() => response);

      expect(effects.loadHouseholds$).toBeObservable(expected);
    });
  });

  describe('openCreateDialog$', () => {
    it('should return addHousehold on openCreateHouseholdDialog when request provided', () => {
      const request = TEST_DATA.household.createHousehold;
      const action = HouseholdActions.openCreateHouseholdDialog();
      const completion = HouseholdActions.addHousehold({ request });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: request });
      const expected = cold('--b', { b: completion });
      dialog.open = jest.fn(() => {
        return {
          afterClosed: jest.fn(() => response)
        };
      });

      expect(effects.openCreateDialog$).toBeObservable(expected);
    });
  });

  describe('openModifyDialog$', () => {
    it('should return updateHousehold on openEditHouseholdDialog when request provided', () => {
      const request = TEST_DATA.household.modifyHousehold;
      const action = HouseholdActions.openEditHouseholdDialog({ request: { householdId: request.id } });
      const completion = HouseholdActions.updateHousehold({ request });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: request });
      const expected = cold('--b', { b: completion });
      dialog.open = jest.fn(() => {
        return {
          afterClosed: jest.fn(() => response)
        };
      });

      expect(effects.openModifyDialog$).toBeObservable(expected);
    });
  });

  describe('error$', () => {
    it('should show toast on addHouseholdFail', (done) => {
      const action = HouseholdActions.addHouseholdFail({ error: {
        message: 'error occured'
      }});

      actions$ = of(action);

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });

    it('should show toast on loadHouseholdsFail', (done) => {
      const action = HouseholdActions.loadHouseholdsFail({ error: {
        message: 'error occured'
      }});

      actions$ = of(action);

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  it('should show toast on removeHouseholdFail', (done) => {
    const action = HouseholdActions.removeHouseholdFail({ error: {
      message: 'error occured'
    }});

    actions$ = of(action);

    effects.error$.subscribe(() => {
      expect(toastrService.error).toHaveBeenCalled();
      done();
    });
  });

  it('should show toast on updateHouseholdFail', (done) => {
    const action = HouseholdActions.updateHouseholdFail({ error: {
      message: 'error occured'
    }});

    actions$ = of(action);

    effects.error$.subscribe(() => {
      expect(toastrService.error).toHaveBeenCalled();
      done();
    });
  });

  describe('reload$', () => {
    it('should return loadHouseholds on applyFilter', () => {
      const action = HouseholdActions.applyFilter({ request: { searchText: 'test' } });
      const completion = HouseholdActions.loadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return loadHouseholds on removeHouseholdSuccess', () => {
      const action = HouseholdActions.removeHouseholdSuccess({ response: { householdId: TEST_DATA.household.household.id } });
      const completion = HouseholdActions.loadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return loadHouseholds on addHouseholdSuccess', () => {
      const action = HouseholdActions.addHouseholdSuccess({ response: { householdId: TEST_DATA.household.household.id } });
      const completion = HouseholdActions.loadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return loadHouseholds on updateHouseholdSuccess', () => {
      const action = HouseholdActions.updateHouseholdSuccess({ response: { householdId: TEST_DATA.household.household.id } });
      const completion = HouseholdActions.loadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });
  });

  describe('isMobile$', () => {
    it('should return InitHouseholds on mobile change', () => {
      getIsMobile.setResult(true);

      const completion = HouseholdActions.initHouseholds();

      const expected = cold('a', { a: completion });

      expect(effects.isMobile$).toBeObservable(expected);
    });
  });

  describe('reload$', () => {
    it('should return loadHouseholds on applyFilter', () => {
      const action = HouseholdActions.applyFilter({ request: {
        appendData: true
      }});
      const completion = HouseholdActions.loadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return loadHouseholds on removeHouseholdSuccess', () => {
      const action = HouseholdActions.removeHouseholdSuccess({ response: { householdId: TEST_DATA.household.household.id  }});
      const completion = HouseholdActions.loadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return loadHouseholds on addHouseholdSuccess', () => {
      const action = HouseholdActions.addHouseholdSuccess({ response: { householdId: TEST_DATA.household.household.id  }});
      const completion = HouseholdActions.loadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return loadHouseholds on updateHouseholdSuccess', () => {
      const action = HouseholdActions.updateHouseholdSuccess({ response: { householdId: TEST_DATA.household.household.id  }});
      const completion = HouseholdActions.loadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });
  });
});

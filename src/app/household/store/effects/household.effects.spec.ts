/// <reference types="jest" />
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { MatDialog } from '@angular/material';
import { hot, cold } from 'jasmine-marbles';
import { StoreModule, Store } from '@ngrx/store';

import { CreateHousehold } from '../../models/requests/createHousehold.model';
import { ModifyHousehold } from '../../models/requests/modifyHousehold.model';
import { MockStore } from '../../../shared/tests/mockStore';
import { Household } from '../../models/household.model';
import { HouseholdService } from '../../services/household.service';
import { HouseholdEffects } from './household.effects';
import {
  AddHousehold,
  AddHouseholdSuccess,
  AddHouseholdFail,
  UpdateHousehold,
  UpdateHouseholdSuccess,
  UpdateHouseholdFail,
  RemoveHousehold,
  RemoveHouseholdSuccess,
  RemoveHouseholdFail,
  LoadHouseholds,
  LoadHouseholdsSuccess,
  LoadHouseholdsFail,
  OpenCreateHouseholdDialog,
  OpenEditHouseholdDialog,
  ApplyFilter,
  InitHouseholds
} from '../actions/household.actions';
import { HouseholdFilter } from '../../models/householdFilter.model';
import { User } from '../../../auth/models/user.model';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('HouseholdEffects', () => {
  let effects: HouseholdEffects;
  let actions$: Observable<any>;
  let dialog: any;
  let toastrService: any;
  let householdService: HouseholdService;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
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
        {
          provide: Store,
          useClass: MockStore
        },
        provideMockActions(() => actions$),
      ]
    });

    effects = TestBed.get(HouseholdEffects);
    actions$ = TestBed.get(Actions);
    toastrService = TestBed.get(ToastrService);
    householdService = TestBed.get(HouseholdService);
    dialog = TestBed.get(MatDialog);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('addHousehold$', () => {
    it('should return AddHouseholdSuccess on AddHousehold when success', () => {
      const household = TEST_DATA.household.household as Household;
      const action = new AddHousehold({
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
      });
      const completion = new AddHouseholdSuccess({ householdId: household.id });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: of(true) });
      const expected = cold('--b', { b: completion });
      householdService.create = jest.fn(() => response);

      expect(effects.addHousehold$).toBeObservable(expected);
    });

    it('should return AddHouseholdFail on AddHousehold when error', () => {
      const error = 'error occured';
      const action = new AddHousehold({
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
      });
      const completion = new AddHouseholdFail({
        message: error
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      householdService.create = jest.fn(() => response);

      expect(effects.addHousehold$).toBeObservable(expected);
    });
  });

  describe('updateHousehold$', () => {
    it('should return UpdateHouseholdSuccess on UpdateHousehold when success', () => {
      const household = TEST_DATA.household.household as Household;
      const action = new UpdateHousehold({
        id: household.id,
        name: household.name,
        symbol: household.symbol,
        description: household.description,
        street: household.street,
        city: household.city,
        country: household.country,
        zipCode: household.zipCode,
        version: household.version
      });
      const completion = new UpdateHouseholdSuccess({ householdId: household.id });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: of(true) });
      const expected = cold('--b', { b: completion });
      householdService.update = jest.fn(() => response);

      expect(effects.updateHousehold$).toBeObservable(expected);
    });

    it('should return UpdateHouseholdFail on UpdateHousehold when error', () => {
      const error = 'error occured';
      const action = new UpdateHousehold({
        id: TEST_DATA.household.household.id,
        name: TEST_DATA.household.household.name,
        symbol: TEST_DATA.household.household.symbol,
        description: TEST_DATA.household.household.description,
        street: TEST_DATA.household.household.street,
        city: TEST_DATA.household.household.city,
        country: TEST_DATA.household.household.country,
        zipCode: TEST_DATA.household.household.zipCode,
        version: TEST_DATA.household.household.version
      });
      const completion = new UpdateHouseholdFail({
        message: error
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      householdService.update = jest.fn(() => response);

      expect(effects.updateHousehold$).toBeObservable(expected);
    });
  });

  describe('deleteHousehold$', () => {
    it('should return RemoveHouseholdSuccess on RemoveHousehold when success', () => {
      const request = {
        householdId: TEST_DATA.household.household.id
      };
      const action = new RemoveHousehold(request);
      const completion = new RemoveHouseholdSuccess(request);

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: of(true) });
      const expected = cold('--b', { b: completion });
      householdService.delete = jest.fn(() => response);

      expect(effects.deleteHousehold$).toBeObservable(expected);
    });

    it('should return RemoveHouseholdFail on RemoveHousehold when error', () => {
      const error = 'error occured';
      const action = new RemoveHousehold({
        householdId: TEST_DATA.household.household.id
      });
      const completion = new RemoveHouseholdFail({
        message: error
      });

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      householdService.delete = jest.fn(() => response);

      expect(effects.deleteHousehold$).toBeObservable(expected);
    });
  });

  describe('initHouseholds', () => {
    it('should ApplyFilter with appendData if mobile', () => {
      store.setState({
        layout: {
          isMobile: true
        }
      });
      const action = new InitHouseholds();
      const completion = new ApplyFilter({
        pageNumber: 1,
        pageSize: 10,
        sortingField: 'name',
        sortDirection: 'asc',
        appendData: true
      });

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.initHouseholds$).toBeObservable(expected);
    });

    it('should ApplyFilter with no appendData if desktop', () => {
      store.setState({
        layout: {
          isMobile: false
        }
      });
      const action = new InitHouseholds();
      const completion = new ApplyFilter({
        appendData: false
      });

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.initHouseholds$).toBeObservable(expected);
    });
  });

  describe('loadHouseholds$', () => {
    beforeEach(() => {
      store.setState({
        households: {
          filter: TEST_DATA.household.filter as HouseholdFilter
        },
        auth: {
          status: {
            user: TEST_DATA.auth.user as User
          }
        }
      });
    });

    it('should return LoadHouseholdsSuccess with households on LoadHouseholds when success', () => {
      const households = TEST_DATA.household.households as Household[];
      const action = new LoadHouseholds();
      const completion = new LoadHouseholdsSuccess({
        count: households.length,
        households: households
      });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: { count: households.length, households: households } });
      const expected = cold('--b', { b: completion });
      householdService.getAllForUser = jest.fn(() => response);

      expect(effects.loadHouseholds$).toBeObservable(expected);
    });

    it('should return LoadHouseholdsFail on LoadHouseholds when error', () => {
      const error = 'error occured';
      const action = new LoadHouseholds();
      const completion = new LoadHouseholdsFail({
        message: error
      });

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      householdService.getAllForUser = jest.fn(() => response);

      expect(effects.loadHouseholds$).toBeObservable(expected);
    });
  });

  describe('openCreateDialog$', () => {
    it('should return AddHousehold on OpenCreateHouseholdDialog when request provided', () => {
      store.setState({
        auth: {
          status: {
            user: TEST_DATA.auth.user as User
          }
        }
      });
      const request = TEST_DATA.household.createHousehold as CreateHousehold;
      const action = new OpenCreateHouseholdDialog();
      const completion = new AddHousehold(request);

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
    beforeEach(() => {
      store.setState({
        households: {
          loading: false,
          ids: [
            '550416ea-b523-4468-ae10-ea07d35eb9f0'
          ],
          entities: {
            '550416ea-b523-4468-ae10-ea07d35eb9f0': {
              id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
              name: 'Household1 Name',
              symbol: 'Household1 symbol',
              description: 'Household1 description',
              street: 'Household1 street',
              city: 'Household1 city',
              country: 'Household1 country',
              zipCode: 'Household1 zipCode',
              version: 1
            }
          }
        },
        auth: {
          status: {
            user: TEST_DATA.auth.user as User
          }
        }
      });
    });

    it('should return UpdateHousehold on OpenEditHouseholdDialog when request provided', () => {
      const request = TEST_DATA.household.modifyHousehold as ModifyHousehold;
      const action = new OpenEditHouseholdDialog({ householdId: request.id });
      const completion = new UpdateHousehold(request);

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
    it('should show toast on AddHouseholdFail', (done) => {
      const action = new AddHouseholdFail({
        message: 'error occured'
      });

      actions$ = of(action);

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });

    it('should show toast on LoadHouseholdsFail', (done) => {
      const action = new LoadHouseholdsFail({
        message: 'error occured'
      });

      actions$ = of(action);

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  it('should show toast on RemoveHouseholdFail', (done) => {
    const action = new RemoveHouseholdFail({
      message: 'error occured'
    });

    actions$ = of(action);

    effects.error$.subscribe(() => {
      expect(toastrService.error).toHaveBeenCalled();
      done();
    });
  });

  it('should show toast on UpdateHouseholdFail', (done) => {
    const action = new UpdateHouseholdFail({
      message: 'error occured'
    });

    actions$ = of(action);

    effects.error$.subscribe(() => {
      expect(toastrService.error).toHaveBeenCalled();
      done();
    });
  });

  describe('reload$', () => {
    it('should return LoadHouseholds on ApplyFilter', () => {
      const action = new ApplyFilter({ searchText: 'test'});
      const completion = new LoadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return LoadHouseholds on RemoveHouseholdSuccess', () => {
      const action = new RemoveHouseholdSuccess({ householdId: TEST_DATA.household.household.id});
      const completion = new LoadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return LoadHouseholds on AddHouseholdSuccess', () => {
      const action = new AddHouseholdSuccess({ householdId: TEST_DATA.household.household.id});
      const completion = new LoadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });

    it('should return LoadHouseholds on UpdateHouseholdSuccess', () => {
      const action = new UpdateHouseholdSuccess({ householdId: TEST_DATA.household.household.id});
      const completion = new LoadHouseholds();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.reload$).toBeObservable(expected);
    });
  });

  describe('isMobile$', () => {
    it('should return InitHouseholds on mobile change', () => {
      store.setState({
        layout: {
          isMobile: true
        }
      });
      const completion = new InitHouseholds();

      const expected = cold('a', { a: completion });

      expect(effects.isMobile$).toBeObservable(expected);
    });
  });
});

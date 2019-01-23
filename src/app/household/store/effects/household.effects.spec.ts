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
  OpenEditHouseholdDialog
} from '../actions/household.actions';

describe('AuthEffects', () => {
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

  describe('addHousehold$', () => {
    it('should return AddHouseholdSuccess on AddHousehold when success', () => {
      const household = {
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      } as Household;
      const action = new AddHousehold({
        userId: '550416ea-b523-4468-ae10-ea07d35eb9f0',
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
      const completion = new AddHouseholdSuccess(household);

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: of(true)});
      const expected = cold('--b', {b: completion});
      householdService.create = jest.fn(() => response);

      expect(effects.addHousehold$).toBeObservable(expected);
    });

    it('should return AddHouseholdFail on AddHousehold when error', () => {
      const error = 'error occured';
      const action = new AddHousehold({
        userId: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      });
      const completion = new AddHouseholdFail({
        message: error
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', {b: completion});
      householdService.create = jest.fn(() => response);

      expect(effects.addHousehold$).toBeObservable(expected);
    });
  });

  describe('updateHousehold$', () => {
    it('should return UpdateHouseholdSuccess on UpdateHousehold when success', () => {
      const household = {
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      } as Household;
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
      const completion = new UpdateHouseholdSuccess({
        ...household,
        version: household.version + 1
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: of(true)});
      const expected = cold('--b', {b: completion});
      householdService.update = jest.fn(() => response);

      expect(effects.updateHousehold$).toBeObservable(expected);
    });

    it('should return UpdateHouseholdFail on UpdateHousehold when error', () => {
      const error = 'error occured';
      const action = new UpdateHousehold({
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      });
      const completion = new UpdateHouseholdFail({
        message: error
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', {b: completion});
      householdService.update = jest.fn(() => response);

      expect(effects.updateHousehold$).toBeObservable(expected);
    });
  });

  describe('deleteHousehold$', () => {
    it('should return RemoveHouseholdSuccess on RemoveHousehold when success', () => {
      const request = {
        householdId: '550416ea-b523-4468-ae10-ea07d35eb9f0'
      };
      const action = new RemoveHousehold(request);
      const completion = new RemoveHouseholdSuccess(request);

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: of(true)});
      const expected = cold('--b', {b: completion});
      householdService.delete = jest.fn(() => response);

      expect(effects.deleteHousehold$).toBeObservable(expected);
    });

    it('should return RemoveHouseholdFail on RemoveHousehold when error', () => {
      const error = 'error occured';
      const action = new RemoveHousehold({
        householdId: '550416ea-b523-4468-ae10-ea07d35eb9f0'
      });
      const completion = new RemoveHouseholdFail({
        message: error
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', {b: completion});
      householdService.delete = jest.fn(() => response);

      expect(effects.deleteHousehold$).toBeObservable(expected);
    });
  });

  describe('loadHouseholds$', () => {
    it('should return LoadHouseholdsSuccess with households on LoadHouseholds when success', () => {
      const households = [
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
        },
        {
          id: '55798c3b-5551-489b-9dd2-d7e59691a368',
          name: 'Household2 Name',
          symbol: 'Household2 symbol',
          description: 'Household2 description',
          street: 'Household2 street',
          city: 'Household2 city',
          country: 'Household2 country',
          zipCode: 'Household2 zipCode',
          version: 1
        },
        {
          id: 'b28e143a-a64a-469a-9704-a294cc7356cf',
          name: 'Household3 Name',
          symbol: 'Household3 symbol',
          description: 'Household3 description',
          street: 'Household3 street',
          city: 'Household3 city',
          country: 'Household3 country',
          zipCode: 'Household3 zipCode',
          version: 1
        }
      ] as Household[];
      const action = new LoadHouseholds({
        userId: '550416ea-b523-4468-ae10-ea07d35eb9f0'
      });
      const completion = new LoadHouseholdsSuccess(households);

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: households});
      const expected = cold('--b', {b: completion});
      householdService.getAllForUser = jest.fn(() => response);

      expect(effects.loadHouseholds$).toBeObservable(expected);
    });

    it('should return LoadHouseholdsFail on LoadHouseholds when error', () => {
      const error = 'error occured';
      const action = new LoadHouseholds({
        userId: '550416ea-b523-4468-ae10-ea07d35eb9f0'
      });
      const completion = new LoadHouseholdsFail({
        message: error
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, error);
      const expected = cold('--b', {b: completion});
      householdService.getAllForUser = jest.fn(() => response);

      expect(effects.loadHouseholds$).toBeObservable(expected);
    });
  });

  describe('openCreateDialog$', () => {
    it('should return AddHousehold on OpenCreateHouseholdDialog when request provided', () => {
      const request = {
        userId: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      } as CreateHousehold;
      const action = new OpenCreateHouseholdDialog({
        userId: request.id,
      });
      const completion = new AddHousehold(request);

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: request});
      const expected = cold('--b', {b: completion});
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
          }
        }
      });
    });

    it('should return UpdateHousehold on OpenEditHouseholdDialog when request provided', () => {
      const request = {
        id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        name: 'Household1 Name',
        symbol: 'Household1 symbol',
        description: 'Household1 description',
        street: 'Household1 street',
        city: 'Household1 city',
        country: 'Household1 country',
        zipCode: 'Household1 zipCode',
        version: 1
      } as ModifyHousehold;
      const action = new OpenEditHouseholdDialog({
        userId: '550416ea-b523-4468-ae10-ea07d35eb9f0',
        householdId: request.id
      });
      const completion = new UpdateHousehold(request);

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: request});
      const expected = cold('--b', {b: completion});
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
});

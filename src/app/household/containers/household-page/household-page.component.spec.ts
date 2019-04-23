/// <reference types="jest" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

import { HouseholdPageComponent } from './household-page.component';
import { MaterialModule } from '../../../material/material.module';
import { MockStore } from '../../../shared/tests/mockStore';
import { HouseholdListComponent, HouseholdTilesComponent } from '../../components';
import { User } from '../../../auth/models/user.model';
import * as HouseholdActions from '../../store/actions/household.actions';
import { HouseholdFilter } from '../../models/householdFilter.model';

describe('HouseholdPageComponent', () => {
  let component: HouseholdPageComponent;
  let fixture: ComponentFixture<HouseholdPageComponent>;

  let store: MockStore<any>;
  const user: User = {
    id: '7bb78f33-0612-409e-a1d6-4341fcee9a7e',
    name: 'UserName'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        HouseholdPageComponent,
        HouseholdListComponent,
        HouseholdTilesComponent
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: HAMMER_LOADER, useValue: () => new Promise(() => {}) }
      ]
    })
    .overrideComponent(HouseholdPageComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({
      layout: {
        isMobile: false
      },
      auth: {
        status: {
          user: user
        }
      },
      households: {
        loading: false,
        ids: [
          '550416ea-b523-4468-ae10-ea07d35eb9f0',
          '55798c3b-5551-489b-9dd2-d7e59691a368',
          'b28e143a-a64a-469a-9704-a294cc7356cf'
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
          },
          '55798c3b-5551-489b-9dd2-d7e59691a368': {
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
          'b28e143a-a64a-469a-9704-a294cc7356cf': {
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
        }
      }
    });
    fixture = TestBed.createComponent(HouseholdPageComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch OpenCreateHouseholdDialog action', () => {
    const expected = new HouseholdActions.OpenCreateHouseholdDialog({
      userId: user.id
    });

    component.onCreate();

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });

  it('should dispatch OpenEditHouseholdDialog action', () => {
    const householdId = '550416ea-b523-4468-ae10-ea07d35eb9f0';
    const expected = new HouseholdActions.OpenEditHouseholdDialog({
      userId: user.id,
      householdId: householdId
    });

    component.onEdit(householdId);

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch RemoveHousehold action', () => {
    const householdId = '550416ea-b523-4468-ae10-ea07d35eb9f0';
    const expected = new HouseholdActions.RemoveHousehold({
      householdId: householdId
    });

    component.onRemove(householdId);

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch ApplyFilter action', () => {
    const filterChange = {
      searchText: 'Household1'
    } as Partial<HouseholdFilter>;
    const expected = new HouseholdActions.ApplyFilter(filterChange);

    component.onFilterChanged(filterChange);

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch InitHouseholds action on isMobile change', () => {
    const expected = new HouseholdActions.InitHouseholds();
    store.setState({
      layout: {
        isMobile: true
      },
      auth: {
        status: {
          user: Object.assign({}, user)
        }
      },
      households: {
        households: {
          ids: [],
        }
      }
    });

    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });
});

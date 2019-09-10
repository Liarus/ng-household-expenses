import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HouseholdPageComponent } from './household-page.component';
import { MaterialModule } from '../../../material/material.module';
import { HouseholdListComponent, HouseholdTilesComponent, HouseholdSearchComponent } from '../../components';
import * as HouseholdActions from '../../store/actions/household.actions';
import { HouseholdFilter } from '../../models/householdFilter.model';
import { TEST_DATA } from 'src/app/shared/tests/test-data';

describe('HouseholdPageComponent', () => {
  let component: HouseholdPageComponent;
  let fixture: ComponentFixture<HouseholdPageComponent>;

  let store: MockStore<any>;
  const initialState = {
    layout: {
      isMobile: false
    },
    auth: {
      status: {
        user: TEST_DATA.auth.user
      }
    },
    households: {
      loading: false,
      ids: [],
      entities: {
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
      ],
      declarations: [
        HouseholdPageComponent,
        HouseholdListComponent,
        HouseholdTilesComponent,
        HouseholdSearchComponent
      ],
      providers: [
        { provide: HAMMER_LOADER, useValue: () => new Promise(() => {}) },
        provideMockStore({ initialState })
      ]
    })
    .overrideComponent(HouseholdPageComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(HouseholdPageComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch openCreateHouseholdDialog action', () => {
    const expected = HouseholdActions.openCreateHouseholdDialog();

    component.onCreate();

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });

  it('should dispatch openEditHouseholdDialog action', () => {
    const householdId = TEST_DATA.household.household.id;
    const expected = HouseholdActions.openEditHouseholdDialog({ request: { householdId } });

    component.onEdit(householdId);

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch removeHousehold action', () => {
    const householdId = TEST_DATA.household.household.id;
    const expected = HouseholdActions.removeHousehold({ request: { householdId } });

    component.onRemove(householdId);

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch applyFilter action', () => {
    const request = {
      searchText: 'Household1'
    } as Partial<HouseholdFilter>;
    const expected = HouseholdActions.applyFilter({ request });

    component.onFilterChanged(request);

    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });
});

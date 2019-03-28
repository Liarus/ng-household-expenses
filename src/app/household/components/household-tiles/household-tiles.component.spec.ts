import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HouseholdTilesComponent } from './household-tiles.component';
import { Household } from '../../models/household.model';
import { MaterialModule } from '../../../material/material.module';

describe('HouseholdTilesComponent', () => {
  let component: HouseholdTilesComponent;
  let fixture: ComponentFixture<HouseholdTilesComponent>;

  const households: Household[] = [
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
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [ HouseholdTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot when with households', () => {
    component.isLoading = false;
    component.households = households;
    component.itemCount = households.length;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  describe('onLoadMore', () => {
    it('should chenge filter when more households exist', () => {
      component.isLoading = false;
      component.households = households;
      component.itemCount = households.length - 1;
      spyOn(component.filterChanged, 'emit');

      fixture.detectChanges();
      component.onLoadMore();

      expect(component.filterChanged.emit).toHaveBeenCalled();
    });

    it('should not change filter if all households rendered', () => {
      component.isLoading = false;
      component.households = households;
      component.itemCount = households.length;
      spyOn(component.filterChanged, 'emit');

      fixture.detectChanges();
      component.onLoadMore();

      expect(component.filterChanged.emit).not.toHaveBeenCalled();
    });
  });
});

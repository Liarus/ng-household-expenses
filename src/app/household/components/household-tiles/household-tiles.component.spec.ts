import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HouseholdTilesComponent } from './household-tiles.component';
import { Household } from '../../models/household.model';
import { MaterialModule } from '../../../material/material.module';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('HouseholdTilesComponent', () => {
  let component: HouseholdTilesComponent;
  let fixture: ComponentFixture<HouseholdTilesComponent>;

  const households = TEST_DATA.household.households as Household[];

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

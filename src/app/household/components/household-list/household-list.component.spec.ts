/// <reference types="jest" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER, By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

import { HouseholdListComponent } from './household-list.component';
import { MaterialModule } from '../../../material/material.module';
import { Household } from '../../models/household.model';
import { HouseholdFilter } from '../../models/householdFilter.model';
import { TEST_DATA } from '../../../shared/tests/test-data';

fdescribe('HouseholdListComponent', () => {
  let component: HouseholdListComponent;
  let fixture: ComponentFixture<HouseholdListComponent>;

  const households = TEST_DATA.household.households as Household[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [ HouseholdListComponent ],
      providers: [
        {provide: HAMMER_LOADER, useValue: () => new Promise(() => {})}
      ]
    })
    .overrideComponent(HouseholdListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot when with households', () => {
    component.isLoading = false;
    component.households = households;
    component.itemCount = households.length;
    component.filter = TEST_DATA.household.filter as HouseholdFilter;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should create household', () => {
    const buttonDebugElement = fixture.debugElement.query(By.css('#household-btn-add'));
    spyOn(component.create, 'emit');

    buttonDebugElement.triggerEventHandler('click', {});

    expect(component.create.emit).toHaveBeenCalled();
  });

  it('should edit household', () => {
    component.isLoading = false;
    component.households = households;

    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.mat-cell > button'));
    spyOn(component.edit, 'emit');

    expect(buttons.length).toBeGreaterThan(0);

    buttons[0].triggerEventHandler('click', {});

    expect(component.edit.emit).toHaveBeenCalled();
  });

  it('should remove household', () => {
    component.isLoading = false;
    component.households = households;

    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button + button[color="warn"]'));
    spyOn(component.remove, 'emit');

    expect(buttons.length).toBeGreaterThan(0);

    buttons[0].triggerEventHandler('click', {});

    expect(component.remove.emit).toHaveBeenCalled();
  });

  it('should change filter when page changed', () => {
    component.isLoading = false;
    component.households = households;
    component.itemCount = 50;
    component.filter = TEST_DATA.household.filter as HouseholdFilter;
    spyOn(component.filterChanged, 'emit');

    component.ngAfterViewInit();
    fixture.detectChanges();
    component.paginator.page.emit({ pageIndex: 2, pageSize: 10, length: 10 });

    expect(component.filterChanged.emit).toHaveBeenCalled();
  });

  it('should change filter when sorting changed', () => {
    component.isLoading = false;
    component.households = households;
    component.itemCount = 50;
    component.filter = TEST_DATA.household.filter as HouseholdFilter;
    spyOn(component.filterChanged, 'emit');

    component.ngAfterViewInit();
    fixture.detectChanges();
    component.sort.sortChange.emit({ active: 'symbol', direction: 'desc' });

    expect(component.filterChanged.emit).toHaveBeenCalled();
  });

  it('should change filter when searched', async () => {
    jest.useFakeTimers();
    spyOn(component.filterChanged, 'emit');

    component.search('test');
    jest.advanceTimersByTime(1500);

    expect(component.filterChanged.emit).toHaveBeenCalled();
  });
});

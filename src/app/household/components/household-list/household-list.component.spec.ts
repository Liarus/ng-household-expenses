/// <reference types="jest" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER, By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

import { HouseholdListComponent } from './household-list.component';
import { MaterialModule } from '../../../material/material.module';
import { Household } from '../../models/household.model';
import { HouseholdFilter } from '../../models/householdFilter.model';

describe('HouseholdListComponent', () => {
  let component: HouseholdListComponent;
  let fixture: ComponentFixture<HouseholdListComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot when with households', () => {
    component.isLoading = false;
    component.households = households;
    component.isMobile = false;
    component.itemCount = households.length;
    component.filter = {
      pageNumber: 1,
      pageSize: 10,
      searchText: '',
      sortingField: 'name',
      sortDirection: 'asc'
    } as HouseholdFilter;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should match snapshot when with households and mobile', () => {
    component.isLoading = false;
    component.households = households;
    component.isMobile = true;

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
    component.isMobile = false;

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
    component.isMobile = false;

    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button + button[color="warn"]'));
    spyOn(component.remove, 'emit');

    expect(buttons.length).toBeGreaterThan(0);

    buttons[0].triggerEventHandler('click', {});

    expect(component.remove.emit).toHaveBeenCalled();
  });

  it('should change filter when searched', () => {
    jest.useFakeTimers();
    spyOn(component.filterChanged, 'emit');
    component.search('test');
    setTimeout(() => {
      expect(component.filterChanged.emit).toHaveBeenCalled();
    }, 1500);
    jest.runAllTimers();
  });

  // it('should change filter when page changed', () => {
  //   spyOn(component.filterChanged, 'emit');
  //   component.filter = {
  //     pageNumber: 1,
  //     pageSize: 10,
  //     searchText: '',
  //     sortingField: 'name',
  //     sortDirection: 'asc'
  //   } as HouseholdFilter;
  //   fixture.detectChanges();
  //   component.ngAfterViewInit();
  //   fixture.detectChanges();

  //   component.paginator.page.emit({ pageIndex: 2, pageSize: 10, length: 10 });

  //   expect(component.filterChanged.emit).toHaveBeenCalled();
  // });

  // it('should change filter when sorting changed', () => {
  //   spyOn(component.filterChanged, 'emit');
  //   component.isLoading = false;
  //   component.households = households;
  //   component.isMobile = false;
  //   component.itemCount = households.length;
  //   component.filter = {
  //     pageNumber: 1,
  //     pageSize: 10,
  //     searchText: '',
  //     sortingField: 'name',
  //     sortDirection: 'asc'
  //   } as HouseholdFilter;
  //   fixture.detectChanges();
  //   component.ngAfterViewInit();
  //   fixture.detectChanges();

  //   const sortHeader = fixture.debugElement.queryAll(By.css('.mat-column-name > .mat-sort-header-container > button'));
  //   expect(sortHeader).toBeDefined();
  //   expect(sortHeader.length).toBeGreaterThan(0);
  //   sortHeader[0].triggerEventHandler('click', {});

  //   expect(component.filterChanged.emit).toHaveBeenCalled();
  // });
});

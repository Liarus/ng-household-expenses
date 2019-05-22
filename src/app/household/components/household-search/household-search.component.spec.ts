/// <reference types="jest" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { HouseholdSearchComponent } from './household-search.component';
import { MaterialModule } from '../../../material/material.module';

fdescribe('HouseholdListComponent', () => {
  let component: HouseholdSearchComponent;
  let fixture: ComponentFixture<HouseholdSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [ HouseholdSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create household', () => {
    const buttonDebugElement = fixture.debugElement.query(By.css('#household-btn-add'));
    spyOn(component.create, 'emit');

    buttonDebugElement.triggerEventHandler('click', {});

    expect(component.create.emit).toHaveBeenCalled();
  });

  it('should change search value when searched', async () => {
    jest.useFakeTimers();
    spyOn(component.searchChanged, 'emit');

    component.search('test');
    jest.advanceTimersByTime(1500);

    expect(component.searchChanged.emit).toHaveBeenCalled();
  });
});

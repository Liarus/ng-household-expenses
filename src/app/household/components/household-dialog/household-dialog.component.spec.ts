import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdDialogComponent } from './household-dialog.component';

describe('HouseholdDialogComponent', () => {
  let component: HouseholdDialogComponent;
  let fixture: ComponentFixture<HouseholdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

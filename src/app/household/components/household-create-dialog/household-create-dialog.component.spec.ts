import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdCreateDialogComponent } from './household-create-dialog.component';

describe('HouseholdDialogComponent', () => {
  let component: HouseholdCreateDialogComponent;
  let fixture: ComponentFixture<HouseholdCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

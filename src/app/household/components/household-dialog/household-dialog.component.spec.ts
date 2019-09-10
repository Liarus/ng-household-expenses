import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HouseholdDialogComponent } from './household-dialog.component';
import { MaterialModule } from '../../../material/material.module';
import { HouseholdDialog } from '../../models/householdDialog.model';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('HouseholdDialogComponent', () => {
  let component: HouseholdDialogComponent;
  let fixture: ComponentFixture<HouseholdDialogComponent>;
  let matDialogRef: MatDialogRef<HouseholdDialogComponent>;

  const matDialogData: HouseholdDialog = {
    userId: TEST_DATA.auth.userId,
    household: TEST_DATA.household.household
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [ HouseholdDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {
          close: jest.fn()
        }
       },
        { provide: MAT_DIALOG_DATA, useValue: matDialogData }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    matDialogRef = TestBed.get(MatDialogRef);
    spyOn(matDialogRef, 'close');
    fixture = TestBed.createComponent(HouseholdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should match snapshot if address invalid', () => {
    component.form.setValue({
      userId: TEST_DATA.auth.userId,
      id: TEST_DATA.household.household.id,
      name: TEST_DATA.household.household.name,
      symbol: TEST_DATA.household.household.symbol,
      description: TEST_DATA.household.household.description,
      street: '',
      city: null,
      country: TEST_DATA.household.household.country,
      zipCode: TEST_DATA.household.household.zipCode,
      version: TEST_DATA.household.household.version
    });

    component.form.controls['city'].markAsTouched();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should close dialog', () => {
    component.onCancelClick();

    expect(matDialogRef.close).toHaveBeenCalled();
  });
});

/// <reference types="jest" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HouseholdDialogComponent } from './household-dialog.component';
import { MaterialModule } from '../../../material/material.module';
import { HouseholdDialog } from '../../models/householdDialog.model';

describe('HouseholdDialogComponent', () => {
  let component: HouseholdDialogComponent;
  let fixture: ComponentFixture<HouseholdDialogComponent>;
  let matDialogRef: MatDialogRef<HouseholdDialogComponent>;

  const matDialogData: HouseholdDialog = {
    userId: '7bb78f33-0612-409e-a1d6-4341fcee9a7e',
    household: {
      id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
      name: 'Household1 Name',
      symbol: 'Household1 symbol',
      description: 'Household1 description',
      street: 'Household1 street',
      city: 'Household1 city',
      country: 'Household1 country',
      zipCode: 'Household1 zipCode',
      version: 1
    }
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

  it('should should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should should match snapshot if address invalid', () => {
    component.form.setValue({
      userId: '7bb78f33-0612-409e-a1d6-4341fcee9a7e',
      id: '550416ea-b523-4468-ae10-ea07d35eb9f0',
      name: 'Household1 Name',
      symbol: 'Household1 symbol',
      description: 'Household1 description',
      street: '',
      city: null,
      country: 'Household1 country',
      zipCode: 'Household1 zipCode',
      version: 1
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

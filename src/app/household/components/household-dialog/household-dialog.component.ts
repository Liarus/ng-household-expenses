import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HouseholdDialog } from '../../models/householdDialog.model';

const fg = dataItem => new FormGroup({
  id: new FormControl(dataItem.id),
  version: new FormControl(dataItem.version),
  userId: new FormControl(dataItem.userId),
  name: new FormControl(dataItem.name, [Validators.required, Validators.maxLength(255)]),
  symbol: new FormControl(dataItem.symbol, [Validators.maxLength(255)]),
  description: new FormControl(dataItem.description, [Validators.maxLength(255)]),
  street: new FormControl(dataItem.street, [Validators.required, Validators.maxLength(255)]),
  city: new FormControl(dataItem.city, [Validators.required, Validators.maxLength(255)]),
  country: new FormControl(dataItem.country, [Validators.required, Validators.maxLength(255)]),
  zipCode: new FormControl(dataItem.zipCode, [Validators.required, Validators.maxLength(255)])
});

@Component({
  selector: 'app-household-dialog',
  templateUrl: './household-dialog.component.html',
  styleUrls: ['./household-dialog.component.scss']
})

export class HouseholdDialogComponent {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<HouseholdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HouseholdDialog) {
      this.form = fg(Object.assign({}, data.household, { userId: data.userId }));
    }

  getAddressErrorMessage() {
    return (this.form.controls['street'].touched && this.form.controls['street'].errors)
      || (this.form.controls['city'].touched && this.form.controls['city'].errors)
      || (this.form.controls['country'].touched && this.form.controls['country'].errors)
      || (this.form.controls['zipCode'].touched && this.form.controls['zipCode'].errors)
      ? 'Please fill address correctly' : '';
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}

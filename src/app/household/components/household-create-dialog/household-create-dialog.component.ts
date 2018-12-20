import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { HouseholdCreateDialog } from '../../models/householdCreateDialog.model';
import { Guid } from '../../../shared/helpers/guid';

const fg = dataItem => new FormGroup({
  userId: new FormControl(dataItem.userId),
  name: new FormControl(dataItem.name, [Validators.required, Validators.maxLength(255)]),
  symbol: new FormControl(dataItem.symbol, [Validators.maxLength(255)]),
  description: new FormControl(dataItem.description, [Validators.required, Validators.maxLength(255)]),
  street: new FormControl(dataItem.street, [Validators.required, Validators.maxLength(255)]),
  city: new FormControl(dataItem.city, [Validators.required, Validators.maxLength(255)]),
  country: new FormControl(dataItem.country, [Validators.required, Validators.maxLength(255)]),
  zipCode: new FormControl(dataItem.zipCode, [Validators.required, Validators.maxLength(255)])
});

@Component({
  selector: 'app-household-create-dialog',
  templateUrl: './household-create-dialog.component.html',
  styleUrls: ['./household-create-dialog.component.scss']
})
export class HouseholdCreateDialogComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<HouseholdCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HouseholdCreateDialog) {
      this.form = fg(
        {
          id: Guid.newGuid(),
          userId: data.userId
        }
      );
    }

    ngOnInit(): void {

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

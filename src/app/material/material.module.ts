import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSliderModule,
  MatDividerModule,
  MatTableModule
} from '@angular/material';

const MaterialModules = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSliderModule,
  MatDividerModule,
  MatTableModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MaterialModules
  ],
  exports: [
    ...MaterialModules
  ]
})
export class MaterialModule {}

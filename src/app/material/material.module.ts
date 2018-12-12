import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatSelectModule,
  MatSliderModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatTableModule,
  MatButtonModule
} from '@angular/material';

const MaterialModules = [
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatButtonModule
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

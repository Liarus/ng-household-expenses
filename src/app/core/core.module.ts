import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';

const PROVIDERS = [
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class CoreModule {}

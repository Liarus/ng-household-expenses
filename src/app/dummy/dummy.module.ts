import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DummyComponent } from './dummy/dummy.component';
import { DummyRoutingModule } from './dummy-router.module';

@NgModule({
  imports: [
    CommonModule,
    DummyRoutingModule
  ],
  exports: [],
  declarations: [DummyComponent],
  providers: [],
})
export class DummyModule {}

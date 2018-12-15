import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-household-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <p>Households</p>
  `
})
export class HouseholdPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

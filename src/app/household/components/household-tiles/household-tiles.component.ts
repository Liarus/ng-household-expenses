import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Household } from '../../models/household.model';
import { HouseholdFilter } from '../../models/householdFilter.model';

@Component({
  selector: 'app-household-tiles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './household-tiles.component.html',
  styleUrls: ['./household-tiles.component.scss']
})
export class HouseholdTilesComponent {
  @Input() households: Household[];
  @Input() isLoading: boolean;
  @Input() itemCount: number;

  @Output() filterChanged = new EventEmitter<Partial<HouseholdFilter>>();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  private pageIndex = 1;

  onLoadMore() {
    if (this.households && this.households.length !== this.itemCount) {
      this.pageIndex ++;
      this.filterChanged.emit({
        pageNumber: this.pageIndex
      });
    }
  }
}

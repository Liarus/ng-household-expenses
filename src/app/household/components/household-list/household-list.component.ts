import { Component, OnInit, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { EventEmitter } from '@angular/core';

import { Household } from '../../models/household.model';


@Component({
  selector: 'app-household-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './household-list.component.html',
  styleUrls: ['./household-list.component.scss']
})
export class HouseholdListComponent implements OnInit {
  @Input()
  set households(households: Household[]) {
    this.setDataSource(households);
  }
  @Input() isLoading: boolean;
  @Input() isMobile: boolean;
  @Output() create = new EventEmitter();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  displayedColumns: string[] = ['name', 'symbol', 'description', 'actions'];
  dataSource: MatTableDataSource<Household>;

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
}

  private setDataSource(households: Household[]) {
    this.dataSource = new MatTableDataSource(households);
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return (data.name && data.name.toLowerCase().includes(filter))
        || (data.symbol && data.symbol.toLowerCase().includes(filter))
        || (data.description && data.description.toString() === filter);
    };
  }
}

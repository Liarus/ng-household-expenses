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

  displayedColumns: string[] = ['name', 'symbol', 'description'];
  dataSource: MatTableDataSource<Household>;

  constructor() { }

  ngOnInit() {
  }

  private setDataSource(households: Household[]) {
    this.dataSource = new MatTableDataSource(households);
  }

}

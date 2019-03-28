import { Component, ChangeDetectionStrategy, Input, Output, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import { Household } from '../../models/household.model';
import { HouseholdFilter } from '../../models/householdFilter.model';

@Component({
  selector: 'app-household-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './household-list.component.html',
  styleUrls: ['./household-list.component.scss']
})
export class HouseholdListComponent implements AfterViewInit, OnDestroy {
  @Input()
  set households(households: Household[]) {
    this.setDataSource(households);
  }
  @Input() isLoading: boolean;
  @Input() filter: HouseholdFilter;
  @Input() itemCount: number;

  @Output() create = new EventEmitter();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() filterChanged = new EventEmitter<Partial<HouseholdFilter>>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'symbol', 'description', 'actions'];
  dataSource: MatTableDataSource<Household>;

  private searchUpdated = new Subject<string>();
  private unsubscribe: Subject<void> = new Subject();

  constructor() {
    this.searchUpdated.asObservable().pipe(
      takeUntil(this.unsubscribe),
      debounceTime(750),
      distinctUntilChanged()
     )
     .subscribe(data => this.searchChanged(data));
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      takeUntil(this.unsubscribe),
      tap(() => this.pageChanged())
    )
    .subscribe();

    this.sort.sortChange.pipe(
      takeUntil(this.unsubscribe),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.sortChanged();
      })
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  search(searchValue: string) {
    searchValue = searchValue.trim();
    searchValue = searchValue.toLowerCase();
    this.searchUpdated.next(searchValue);
  }

  private pageChanged() {
    this.filterChanged.emit({
      pageNumber: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
    } as Partial<HouseholdFilter>);
  }

  private sortChanged() {
    this.filterChanged.emit({
      pageNumber: this.paginator.pageIndex + 1,
      sortingField: this.sort.active,
      sortDirection: this.sort.direction
    } as Partial<HouseholdFilter>);
  }

  private searchChanged(searchValue: string) {
    this.filterChanged.emit({
      searchText: searchValue
    } as Partial<HouseholdFilter>);
  }

  private setDataSource(households: Household[]) {
    this.dataSource = new MatTableDataSource(households);
    this.dataSource.sort = this.sort;
  }
}

import { Component, ChangeDetectionStrategy, Output, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import { HouseholdFilter } from '../../models/householdFilter.model';

@Component({
  selector: 'app-household-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './household-search.component.html',
  styleUrls: ['./household-search.component.scss']
})
export class HouseholdSearchComponent implements OnDestroy {
  @Output() create = new EventEmitter();
  @Output() searchChanged = new EventEmitter<{ searchText: string }>();

  private searchUpdated = new Subject<string>();
  private unsubscribe: Subject<void> = new Subject();

  constructor() {
    this.searchUpdated.asObservable().pipe(
      takeUntil(this.unsubscribe),
      debounceTime(750),
      distinctUntilChanged()
     )
     .subscribe(data => this.notify(data));
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

  private notify(searchValue: string) {
    this.searchChanged.emit({ searchText: searchValue });
  }
}

/// <reference types="jest" />
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { MenuService } from './menu.service';
import { MockStore } from '../../shared/tests/mockStore';

describe('HouseholdService', () => {
  let service: MenuService;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        MenuService,
        { provide: Store, useClass: MockStore }
      ]
    });

    service = TestBed.get(MenuService);
    store = TestBed.get(Store);
    store.setState({
      auth: {
        status: {
          loggedIn: true
        }
      }
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should match snaphot when user logged in', () => {
    service.getMenuItems().subscribe(
      data => expect(data).toMatchSnapshot()
    );
  });

  it('should match snaphot when user not logged in', () => {
    store.setState({
      auth: {
        status: {
          loggedIn: false
        }
      }
    });

    service.getMenuItems().subscribe(
      data => expect(data).toMatchSnapshot()
    );
  });
});

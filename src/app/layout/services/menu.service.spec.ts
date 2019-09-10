import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { MenuService } from './menu.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('HouseholdService', () => {
  let service: MenuService;
  let store: MockStore<any>;
  const initialState = {
    auth: {
      loggedIn: true
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        MenuService,
        provideMockStore({ initialState })
      ]
    });

    service = TestBed.get(MenuService);
    store = TestBed.get(Store);
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
        loggedIn: false
      }
    });

    service.getMenuItems().subscribe(
      data => expect(data).toMatchSnapshot()
    );
  });
});

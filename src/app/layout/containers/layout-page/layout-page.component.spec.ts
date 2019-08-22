import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { LayoutPageComponent } from './layout-page.component';
import { MockStore } from '../../../shared/tests/mockStore';
import { MaterialModule } from '../../../material/material.module';
import { SidebarComponent, ToolbarComponent } from '../../components';
import * as LayoutActions from '../../store/actions/layout.actions';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('LayoutPageComponent', () => {
  let component: LayoutPageComponent;
  let fixture: ComponentFixture<LayoutPageComponent>;

  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        LayoutPageComponent,
        ToolbarComponent,
        SidebarComponent
      ],
      providers: [
        { provide: Store, useClass: MockStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({
      layout: {
        menuItems: TEST_DATA.layout.menuItems,
        isSidebarExpanded: true
      },
      auth: {
        status: {
          user: TEST_DATA.auth.user
        }
      }
    });

    fixture = TestBed.createComponent(LayoutPageComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ng-household-expenses'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-household-expenses');
  });

  it('should dispatch Toggle Sidebar action', () => {
    const expected = new LayoutActions.ToggleSidebar();

    component.onToggleSidebar();

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });

  it('should dispatch Logout action', () => {
    const expected = new AuthActions.Logout();

    component.onLogout();

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });
});

/// <reference types="jest" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent, SidebarComponent } from '../../components';
import { MaterialModule } from '../../../material/material.module';
import { MockStore } from '../../../shared/tests/mockStore';
import * as LayoutActions from '../../store/actions/layout.actions';
import * as AuthActions from '../../../auth/store/actions/auth.actions';

describe('RootComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
        AppComponent,
        ToolbarComponent,
        SidebarComponent
      ],
      providers: [{ provide: Store, useClass: MockStore }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({
      core: {
        layout: {
          menuItems: [
            {
              url: '/1',
              title: 'menuTitle1',
              icon: 'home',
              permissions: ['CanSeeUsers'],
              hidden: false
            },
            {
              url: '/2',
              title: 'menuTitle2',
              icon: 'home',
              permissions: ['CanSeeUsers'],
              hidden: false
            },
            {
              url: '/3',
              title: 'menuTitle3',
              icon: 'home',
              permissions: ['CanSeeUsers'],
              hidden: false
            }
          ],
          isSidebarExpanded: true
        }
      },
      auth: {
        status: {
          user: {
            id: '7bb78f33-0612-409e-a1d6-4341fcee9a7e',
            name: 'UserName'
          }
        }
      }
    });
    fixture = TestBed.createComponent(AppComponent);
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

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should dipsatch ResizeWindow action', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const expected = new LayoutActions.ResizeWindow(
      {
        width: width,
        height: height
      }
    );

    window.dispatchEvent(new Event('resize'));

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });

  it('should dispatch Toggle Sidebar action', () => {
    const expected = new LayoutActions.ToggleSidebar();

    component.onSidebarToggled();

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });

  it('should dispatch Logout action', () => {
    const expected = new AuthActions.Logout();

    component.onLogout();

    expect(store.dispatch).toHaveBeenLastCalledWith(expected);
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '../../../material/material.module';
import { TEST_DATA } from '../../../shared/tests/test-data';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const menuItems = TEST_DATA.layout.menuItems;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      declarations: [SidebarComponent]
    })
    .overrideComponent(SidebarComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot with menu items if expanded', () => {
    component.isExpanded = true;
    component.menuItems = menuItems;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should match snapshot with menu items if collapsed', () => {
    component.isExpanded = false;
    component.menuItems = menuItems;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});

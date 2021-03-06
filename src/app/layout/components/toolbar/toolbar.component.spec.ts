import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

import { User } from '../../../auth/models/user.model';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from '../../../material/material.module';
import { TEST_DATA } from 'src/app/shared/tests/test-data';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  const user = TEST_DATA.auth.user as User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ToolbarComponent]
    })
    .overrideComponent(ToolbarComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const buttonDebugElement = fixture.debugElement.query(By.css('#toolbar-btn-logout'));
    spyOn(component.logout, 'emit');

    buttonDebugElement.triggerEventHandler('click', {});

    expect(component.logout.emit).toHaveBeenCalled();
  });

  it('should toggle sidebar', () => {
    const buttonDebugElement = fixture.debugElement.query(By.css('#toolbar-btn-toggle'));
    spyOn(component.toggleSidebar, 'emit');

    buttonDebugElement.triggerEventHandler('click', {});

    expect(component.toggleSidebar.emit).toHaveBeenCalled();
  });
});

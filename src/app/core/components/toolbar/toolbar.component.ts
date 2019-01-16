import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() user: User;
  @Output() toggleSidebar = new EventEmitter();
  @Output() logout = new EventEmitter();
}

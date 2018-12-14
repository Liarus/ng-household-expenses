import { Component, EventEmitter, Output, Input } from '@angular/core';

import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() user: User;
  @Output() toggleSidebar = new EventEmitter();
}

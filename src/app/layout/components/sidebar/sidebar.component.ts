import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MenuItem } from '../../models/menuItem.model';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isExpanded: boolean;
  @Input() menuItems: MenuItem[];
}

import {Component, Input} from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgForOf
  ],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {
  protected timedOutCloser: NodeJS.Timeout | undefined;
  @Input({required: true}) title: string = "";
  @Input({required: true}) menuItems: string[] = [];

  onMouseEnter(trigger: MatMenuTrigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  onMouseLeave(trigger: MatMenuTrigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }
}

import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DropdownMenuComponent} from "../dropdown-menu/dropdown-menu.component";

@Component({
  selector: 'welcome-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    DropdownMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected accountMenuTitle: string = 'My Account';
  protected accountMenuItems: string[] = ['Home', 'Deposits', 'Credit Cards', 'Debit Cards', 'Loans', 'Mortgages', 'Other'];
}

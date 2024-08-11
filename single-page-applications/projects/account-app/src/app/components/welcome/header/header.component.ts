import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DropdownMenuComponent} from "../dropdown-menu/dropdown-menu.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'welcome-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    DropdownMenuComponent,
    MatIcon,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected accountMenuTitle: string = 'My Account';
  protected transferMenuTitle: string = 'Transfer';
  protected accountMenuItems: string[] = [
    'Home', 'Deposits', 'Credit Cards', 'Debit Cards', 'Loans', 'Mortgages', 'Other'
  ];
  protected transferMenuItems: string[] = [
    'To Other WalletBank Accounts', 'To Other Banks',
  ];
}

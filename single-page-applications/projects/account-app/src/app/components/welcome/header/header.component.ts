import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DropdownMenuComponent} from "../dropdown-menu/dropdown-menu.component";
import {MatIcon} from "@angular/material/icon";
import {MenuItem} from "../../../models/menu-item.model";

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
  protected accountMenuItems: MenuItem[] = [
    {label: 'Home', link: ['account', 'dashboard']},
    {label: 'Deposits', link: ['account', 'deposits']},
    {label: 'Credit Cards', link: ['account', 'credit-cards']},
    {label: 'Debit Cards', link: ['account', 'debit-cards']},
    {label: 'Loans', link: ['account', 'loans']},
    {label: 'Mortgages', link: ['account', 'mortgages']},
    {label: 'Other', link: ['account', 'other']},
  ];
  protected transferMenuItems: MenuItem[] = [
    {label: 'To My Accounts', link: ['transfer', 'to-my-accounts']},
    {label: 'To Other WalletBank Accounts', link: ['transfer', 'to-other-walletbank']},
    {label: 'To Other Banks', link: ['transfer', 'to-other-banks']},
  ];
}

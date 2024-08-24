import {Component, Input, Output} from '@angular/core';
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {TransferToWalletAccountDetails} from "../../../../models/transfer-to-wallet-account-details";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-transfer-to',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
    NgForOf,
    MatLabel,
    MatFormField
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css'
})
export class TransferToComponent {
  @Input() candidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Output() selectedAccount: TransferToWalletAccountDetails | null = null;

  formatAccountDetails(accountDetails: TransferToWalletAccountDetails): string {
    return `Wallet ${accountDetails.accountType} Account ${accountDetails.accountNumber}`;
  }
}

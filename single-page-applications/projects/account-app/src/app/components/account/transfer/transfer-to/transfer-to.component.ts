import {Component, Input, Output} from '@angular/core';
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {
  TransferFromWalletAccountDetails,
  TransferToWalletAccountDetails
} from "../../../../models/transfer-wallet-account-details";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-transfer-to',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
    NgForOf,
    MatLabel,
    MatFormField,
    NgIf
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css'
})
export class TransferToComponent {
  @Input() toCandidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Input() fromCandidateAccountDetails: Array<TransferFromWalletAccountDetails> = [];
  @Output() toSelectedAccount: TransferToWalletAccountDetails | null = null;
  @Output() fromSelectedAccount: TransferFromWalletAccountDetails | null = null;

  formatAccountDetails(accountDetails: TransferToWalletAccountDetails | TransferFromWalletAccountDetails): string {
    return `Wallet ${accountDetails.accountType} Account ${accountDetails.accountNumber}
    ${"recipientName" in accountDetails ? accountDetails.recipientName : accountDetails.accountHolder}`;
  }

  getDefaultFromAccount(): string {
    if (this.fromCandidateAccountDetails.length > 0) {
      return this.formatAccountDetails(this.fromCandidateAccountDetails[0]);
    }
    return "Please select an account";
  }

}

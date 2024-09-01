import {Component, Input, Output} from '@angular/core';
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {
  TransferFromWalletAccountDetails,
  TransferToWalletAccountDetails
} from "../../../../models/transfer-wallet-account-details";
import {NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {TransferType} from "../../../../models/input-details-state";

@Component({
  selector: 'app-transfer-to',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
    NgForOf,
    MatLabel,
    MatFormField,
    NgIf,
    MatInput,
    FormsModule,
    MatRadioGroup,
    MatRadioButton
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css'
})
export class TransferToComponent {
  @Input() toCandidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Input() fromCandidateAccountDetails: Array<TransferFromWalletAccountDetails> = [];
  @Output() toSelectedAccount: TransferToWalletAccountDetails | undefined = undefined;
  @Output() fromSelectedAccount: TransferFromWalletAccountDetails | undefined = undefined;
  @Output() transferAmount: number | undefined = undefined;
  @Output() transferType: TransferType | undefined = undefined;

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

  onTransferTypeChange(event: MatRadioChange) {
    this.transferType = event.value;
  }

  protected readonly TransferType = TransferType;
}

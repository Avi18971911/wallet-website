import {Component, Input, Output} from '@angular/core';
import {MatFormField, MatHint, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {
  TransferFromWalletAccountDetails,
  TransferToWalletAccountDetails
} from "../../../../models/transfer-wallet-account-details";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {TransferType} from "../../../../models/input-details-state";
import {FormatAccountDetailsPipe} from "../../../../pipes/format-account-details.pipe";

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
    MatRadioButton,
    CurrencyPipe,
    MatHint,
    FormatAccountDetailsPipe,
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css',
  providers: [FormatAccountDetailsPipe],
})
export class TransferToComponent {
  @Input() toCandidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Input() fromCandidateAccountDetails: Array<TransferFromWalletAccountDetails> = [];
  @Output() toSelectedAccount: TransferToWalletAccountDetails | undefined = undefined;
  @Output() fromSelectedAccount: TransferFromWalletAccountDetails | undefined = undefined;
  @Output() transferAmount: number | undefined = undefined;
  // TODO: Update this logic to actually schedule the transfer and get the time of the transfer
  @Output() transferType: TransferType | undefined = undefined;

  constructor(private formatAccountDetailsPipe: FormatAccountDetailsPipe) {}

  getDefaultFromAccount(): string {
    if (this.fromCandidateAccountDetails.length > 0) {
      return this.formatAccountDetailsPipe.transform(this.fromCandidateAccountDetails[0]);
    }
    return "Please select an account";
  }

  onTransferTypeChange(event: MatRadioChange) {
    this.transferType = event.value;
  }

  protected readonly TransferType = TransferType;
}

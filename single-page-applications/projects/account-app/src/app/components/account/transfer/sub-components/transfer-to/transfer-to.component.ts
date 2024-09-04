import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectChange
} from "@angular/material/select";
import {TransferToWalletAccountDetails} from "../../../../../models/transfer-wallet-account-details";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {TransferState, TransferType} from "../../../../../models/transfer-state";
import {FormatAccountDetailsPipe} from "../../../../../pipes/format-account-details.pipe";

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
    MatError,
    FormatAccountDetailsPipe,
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css',
  providers: [FormatAccountDetailsPipe],
})
export class TransferToComponent {
  constructor(private formatAccountDetailsPipe: FormatAccountDetailsPipe) {}

  transferState: Partial<TransferState> = {
    toAccount: undefined,
    // TODO: Update this logic to actually schedule the transfer and get the time of the transfer
    transferType: undefined,
  }

  protected transferAmount: number = 0.00;
  @Input() toCandidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();

  onToAccountChange(event: MatSelectChange) {
    const selectedAccount: TransferToWalletAccountDetails = event.value;
    this.transferState.toAccount = selectedAccount.accountNumber;
    this.emitTransferState();
  }

  onTransferTypeChange(event: MatRadioChange) {
    this.transferState.transferType = event.value;
    this.emitTransferState();
  }

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }

  protected readonly TransferType = TransferType;
}

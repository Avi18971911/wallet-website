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
import {
  TransferFromWalletAccountDetails,
  TransferToWalletAccountDetails
} from "../../../../models/transfer-wallet-account-details";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {TransferState, TransferType} from "../../../../models/transfer-state";
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
    MatError,
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css',
  providers: [FormatAccountDetailsPipe],
})
export class TransferToComponent implements OnInit {
  constructor(private formatAccountDetailsPipe: FormatAccountDetailsPipe) {}

  transferState: TransferState = {
    toAccount: undefined,
    fromAccount: undefined,
    amount: undefined,
    // TODO: Update this logic to actually schedule the transfer and get the time of the transfer
    transferType: undefined,
  }

  protected transferAmount: number = 0.00;
  protected defaultFromAccount: string = "Please select an account";
  @Input() toCandidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Input() fromCandidateAccountDetails: Array<TransferFromWalletAccountDetails> = [];
  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<TransferState>();

  onToAccountChange(event: MatSelectChange) {
    const selectedAccount: TransferToWalletAccountDetails = event.value;
    this.transferState.toAccount = selectedAccount.accountNumber;
    this.emitTransferState();
  }

  onFromAccountChange(event: MatSelectChange) {
    const fromAccount: TransferFromWalletAccountDetails = event.value;
    this.transferState.fromAccount = fromAccount.accountNumber;
    this.emitTransferState();
  }

  onTransferTypeChange(event: MatRadioChange) {
    this.transferState.transferType = event.value;
    this.emitTransferState();
  }

  onAmountChange() {
    this.emitTransferState();
  }

  getDefaultFromAccount(): string {
    if (this.fromCandidateAccountDetails.length > 0) {
      return this.formatAccountDetailsPipe.transform(this.fromCandidateAccountDetails[0]);
    }
    return "Please select an account";
  }

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }

  protected readonly TransferType = TransferType;

  ngOnInit() {
    const defaultFromAccount = this.getDefaultFromAccount();
    if (defaultFromAccount !== "Please select an account") {
      this.transferState.fromAccount = this.fromCandidateAccountDetails[0].accountNumber;
      this.emitTransferState()
    }
    this.defaultFromAccount = defaultFromAccount;
  }
}

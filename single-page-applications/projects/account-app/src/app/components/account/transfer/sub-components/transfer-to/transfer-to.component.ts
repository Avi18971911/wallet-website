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
import {TransferState,} from "../../../../../models/transfer-state";
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
  }

  @Input() toCandidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();

  onToAccountChange(event: MatSelectChange) {
    const selectedAccount: TransferToWalletAccountDetails = event.value;
    this.transferState.toAccount = selectedAccount.accountNumber;
    this.emitTransferState();
  }

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }
}

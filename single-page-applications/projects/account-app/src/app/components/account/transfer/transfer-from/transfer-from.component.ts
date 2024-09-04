import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {TransferFromWalletAccountDetails} from "../../../../models/transfer-wallet-account-details";
import {FormatAccountDetailsPipe} from "../../../../pipes/format-account-details.pipe";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-transfer-from',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    FormatAccountDetailsPipe,
    NgForOf
  ],
  templateUrl: './transfer-from.component.html',
  styleUrl: './transfer-from.component.css',
  providers: [FormatAccountDetailsPipe],
})
export class TransferFromComponent implements OnInit {
  constructor(private formatAccountDetailsPipe: FormatAccountDetailsPipe) {}

  protected defaultFromAccount: string = "Please select an account";
  protected fromAccount: string = "";

  @Input() fromCandidateAccountDetails: Array<TransferFromWalletAccountDetails> = [];
  @Input() hasSubmitted: boolean = false;
  @Output() fromAccountChange = new EventEmitter<string>();

  onFromAccountChange(event: MatSelectChange) {
    const fromAccount: TransferFromWalletAccountDetails = event.value;
    this.fromAccount = fromAccount.accountNumber;
    this.emitFromAccountChange();
  }

  getDefaultFromAccount(): string {
    if (this.fromCandidateAccountDetails.length > 0) {
      return this.formatAccountDetailsPipe.transform(this.fromCandidateAccountDetails[0]);
    }
    return "Please select an account";
  }

  emitFromAccountChange() {
    this.fromAccountChange.emit(this.fromAccount)
  }

  ngOnInit() {
    const defaultFromAccount = this.getDefaultFromAccount();
    if (defaultFromAccount !== "Please select an account") {
      this.fromAccount = this.fromCandidateAccountDetails[0].accountNumber;
      this.emitFromAccountChange()
    }
    this.defaultFromAccount = defaultFromAccount;
  }
}

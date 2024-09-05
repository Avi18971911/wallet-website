import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatError, MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {TransferFromWalletAccountDetails} from "../../../../../models/transfer-wallet-account-details";
import {FormatAccountDetailsPipe} from "../../../../../pipes/format-account-details.pipe";
import {NgForOf, NgIf} from "@angular/common";
import { TransferState } from '../../../../../models/transfer-state';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-transfer-from',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    FormatAccountDetailsPipe,
    NgForOf,
    ReactiveFormsModule,
    MatError,
    NgIf
  ],
  templateUrl: './transfer-from.component.html',
  styleUrl: './transfer-from.component.css',
  providers: [FormatAccountDetailsPipe],
})
export class TransferFromComponent implements OnInit {
  constructor(private formatAccountDetailsPipe: FormatAccountDetailsPipe) {}

  protected defaultFromAccount: string = "Please select an account";
  protected transferState: Partial<TransferState> = {
    fromAccount: undefined,
  }

  @Input() fromCandidateAccountDetails: Array<TransferFromWalletAccountDetails> = [];
  @Input() hasSubmitted: boolean = false;
  @Output() fromAccountChange = new EventEmitter<Partial<TransferState>>();

  protected fromControl = new FormControl(this.transferState.fromAccount, [
    Validators.required,
  ]);

  getDefaultFromAccount(): string {
    if (this.fromCandidateAccountDetails.length > 0) {
      return this.formatAccountDetailsPipe.transform(this.fromCandidateAccountDetails[0]);
    }
    return "Please select an account";
  }

  emitFromAccountChange() {
    this.fromAccountChange.emit(this.transferState)
  }

  ngOnInit() {
    const defaultFromAccount = this.getDefaultFromAccount();
    if (defaultFromAccount !== "Please select an account") {
      this.fromControl.setValue(this.fromCandidateAccountDetails[0].accountNumber);
      this.transferState.fromAccount = this.fromCandidateAccountDetails[0].accountNumber;
      this.emitFromAccountChange()
    }
    this.defaultFromAccount = defaultFromAccount;

    this.fromControl.valueChanges.subscribe((value) => {
      this.transferState.fromAccount = value ?? undefined;
      this.emitFromAccountChange();
    });
  }
}

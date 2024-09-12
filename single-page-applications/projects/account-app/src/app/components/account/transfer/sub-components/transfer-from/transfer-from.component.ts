import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatError, MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {TransferFromWalletAccountDetails} from "../../../../../models/transfer-wallet-account-details";
import {FormatAccountDetailsPipe} from "../../../../../pipes/format-account-details.pipe";
import {NgForOf, NgIf} from "@angular/common";
import { TransferState } from '../../../../../models/transfer-state';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject} from "rxjs";

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
export class TransferFromComponent implements OnChanges, OnDestroy {
  constructor(private formatAccountDetailsPipe: FormatAccountDetailsPipe) {}
  private ngUnsubscribe = new Subject<void>()
  protected defaultFromAccount: string = "Please select an account";
  protected transferState: Partial<TransferState> = {
    fromAccountNumber: undefined,
  }

  @Input() fromCandidateAccountDetails: Array<TransferFromWalletAccountDetails> = [];
  @Input() hasSubmitted: boolean = false;
  @Input() fromControl!: FormControl<TransferFromWalletAccountDetails | undefined>;
  @Output() fromAccountChange = new EventEmitter<Partial<TransferState>>();

  private getDefaultFromAccount(): string {
    if (this.fromCandidateAccountDetails.length > 0) {
      return this.formatAccountDetailsPipe.transform(this.fromCandidateAccountDetails[0]);
    }
    return "Please select an account";
  }

  private emitFromAccountChange() {
    this.fromAccountChange.emit(this.transferState)
  }

  private setTransferStateFromAccountDetails(accountDetails: TransferFromWalletAccountDetails | null | undefined) {
    this.transferState.fromAccountNumber =
      accountDetails ? this.formatAccountDetailsPipe.transformAccountNumberWithType(accountDetails) : undefined;
    this.transferState.fromAccountId = accountDetails?.id ?? undefined;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fromControl'] && this.fromControl) {
      const defaultFromAccount = this.getDefaultFromAccount();
      if (defaultFromAccount !== "Please select an account") {
        this.fromControl.setValue(this.fromCandidateAccountDetails[0]);
        this.setTransferStateFromAccountDetails(this.fromCandidateAccountDetails[0]);
        this.emitFromAccountChange()
      }
      this.defaultFromAccount = defaultFromAccount;

      this.fromControl.valueChanges
        .subscribe((value) => {
          this.setTransferStateFromAccountDetails(value);
          this.emitFromAccountChange();
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

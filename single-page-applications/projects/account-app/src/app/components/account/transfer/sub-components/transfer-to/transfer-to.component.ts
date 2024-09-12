import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
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
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TransferState,} from "../../../../../models/transfer-state";
import {FormatAccountDetailsPipe} from "../../../../../pipes/format-account-details.pipe";
import {Subject, takeUntil} from "rxjs";

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
    ReactiveFormsModule,
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css',
  providers: [FormatAccountDetailsPipe],
})
export class TransferToComponent implements OnDestroy, OnChanges {
  constructor(private formatAccountDetailsPipe: FormatAccountDetailsPipe) {}
  private ngUnsubscribe = new Subject<void>();

  transferState: Partial<TransferState> = {
    toAccountNumber: undefined,
    recipientName: undefined,
  }

  @Input() toCandidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Input() hasSubmitted: boolean = false;
  @Input() toControl!: FormControl<TransferToWalletAccountDetails | undefined>;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.hasSubmitted) {
      this.toControl.markAsTouched({onlySelf: true});
    }
    if (changes['toControl'] && this.toControl) {
      this.toControl.valueChanges
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((value) => {
          this.transferState.toAccountNumber =
            value ? this.formatAccountDetailsPipe.transformAccountNumberWithType(value) : undefined;
          this.transferState.recipientName = value?.recipientName ?? undefined;
          this.transferState.toAccountId = value?.id ?? undefined;
          this.emitTransferState();
        });
    }
  }
}

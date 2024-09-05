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
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
    ReactiveFormsModule,
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css',
  providers: [FormatAccountDetailsPipe],
})
export class TransferToComponent implements OnInit {
  constructor(private formatAccountDetailsPipe: FormatAccountDetailsPipe) {}

  transferState: Partial<TransferState> = {
    toAccount: undefined,
  }

  @Input() toCandidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();
  protected toControl = new FormControl(this.transferState.toAccount, [
    Validators.required,
  ]);

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }

  ngOnInit() {
    this.toControl.valueChanges.subscribe((value) => {
      this.transferState.toAccount = value ?? undefined;
      this.emitTransferState();
    });
  }
}

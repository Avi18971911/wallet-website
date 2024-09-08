import {DateFormatService} from "../../../../services/date-format.service";
import {Component, EventEmitter, OnDestroy, OnInit, Optional, Output, SkipSelf} from "@angular/core";
import {
  TransferFromWalletAccountDetails,
  TransferToWalletAccountDetails
} from "../../../../models/transfer-wallet-account-details";
import {AccountService, KnownAccount} from "../../../../services/account.service";
import {TransferState, TransferType} from "../../../../models/transfer-state";
import {DtoKnownAccountDTO} from "../../../../backend-api";
import {CurrentAccountDetails} from "../../../../models/current-account-details";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";
import {TransferService} from "../../../../services/transfer.service";
import {TransferFromComponent} from "../sub-components/transfer-from/transfer-from.component";
import {TransferToComponent} from "../sub-components/transfer-to/transfer-to.component";
import {TransferAmountComponent} from "../sub-components/transfer-amount/transfer-amount.component";
import {TransferTypeComponent} from "../sub-components/transfer-type/transfer-type.component";
import {Subject, takeUntil} from "rxjs";
@Component({
  selector: 'app-input-details',
  standalone: true,
  imports: [
    TransferToComponent,
    MatButtonToggle,
    MatButton,
    TransferFromComponent,
    TransferFromComponent,
    TransferToComponent,
    TransferAmountComponent,
    TransferTypeComponent
  ],
  templateUrl: './input-details.component.html',
  styleUrl: './input-details.component.css'
})
export class InputDetailsComponent implements OnInit, OnDestroy {
  protected hasSubmitted: boolean = false;
  protected toAccountCandidates: Array<TransferToWalletAccountDetails> = [];
  protected fromAccountCandidates: Array<TransferFromWalletAccountDetails> = [];
  private ngUnsubscribe = new Subject<void>();
  protected inputDetailsState: TransferState = {
    toAccount: undefined,
    fromAccount: undefined,
    amount: undefined,
    transferType: undefined,
    recipientName: undefined,
  };

  constructor(
    private accountService: AccountService,
    @SkipSelf() private transferService: TransferService,
  ) { }

  updateInputDetailsState(partialState: Partial<TransferState>) {
    console.log('Partial state:', partialState);
    console.log('Current state:', this.inputDetailsState);
    this.inputDetailsState = { ...this.inputDetailsState, ...partialState };
    console.log('Input details state:', this.inputDetailsState);
  }

  ngOnInit() {
    this.accountService.getKnownAccounts$()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((knownAccounts) => {
        this.setStateToAccountCandidates(knownAccounts);
      });
    // TODO: Update this logic once multiple accounts owned by one person are supported
    this.accountService.getCurrentAccountDetails$()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((currentAccountDetails) => {
        if (currentAccountDetails !== undefined) {
          this.setStateFromAccountCandidates([currentAccountDetails]);
        }
      });
  }

  setStateToAccountCandidates(knownAccounts: KnownAccount[]) {
    this.toAccountCandidates = knownAccounts.map ((account) => {
      return {
        accountNumber: account.accountNumber,
        recipientName: account.accountHolder,
        accountType: this.formatAccountType(account.accountType)
      }
    });
  }

  setStateFromAccountCandidates(knownAccounts: CurrentAccountDetails[]) {
    this.fromAccountCandidates = knownAccounts.map ((account) => {
      return {
        accountNumber: account.accountNumber,
        accountHolder: account.accountHolder,
        accountType: this.formatAccountType(account.accountType)
      }
    });
  }

  formatAccountType(accountType: string): string {
    return accountType.charAt(0).toUpperCase() + accountType.substring(1).toLowerCase()
  }

  validateAndProceed() {
    this.hasSubmitted = true;
    if (
      this.inputDetailsState.toAccount !== undefined &&
      this.inputDetailsState.fromAccount !== undefined &&
      this.inputDetailsState.amount !== undefined &&
      this.inputDetailsState.transferType !== undefined &&
      this.inputDetailsState.recipientName !== undefined
    ) {
        this.transferService.setTransferData(this.inputDetailsState);
      }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

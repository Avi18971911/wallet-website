import {DateFormatService} from "../../../../services/date-format.service";
import {TransferToComponent} from "../transfer-to/transfer-to.component";
import {Component, EventEmitter, OnInit, Optional, Output, SkipSelf} from "@angular/core";
import {
  TransferFromWalletAccountDetails,
  TransferToWalletAccountDetails
} from "../../../../models/transfer-wallet-account-details";
import {AccountService} from "../../../../services/account.service";
import {TransferState, TransferType} from "../../../../models/transfer-state";
import {DtoKnownAccountDTO} from "../../../../backend-api";
import {CurrentAccountDetails} from "../../../../models/current-account-details";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";
import {TransferService} from "../../../../services/transfer.service";
import {TransferFromComponent} from "../transfer-from/transfer-from.component";
@Component({
  selector: 'app-input-details',
  standalone: true,
  imports: [
    TransferToComponent,
    MatButtonToggle,
    MatButton,
    TransferFromComponent
  ],
  templateUrl: './input-details.component.html',
  styleUrl: './input-details.component.css'
})
export class InputDetailsComponent implements OnInit {
  protected dateTime: string = "";
  protected hasSubmitted: boolean = false;
  protected toAccountCandidates: Array<TransferToWalletAccountDetails> = [];
  protected fromAccountCandidates: Array<TransferFromWalletAccountDetails> = [];
  protected inputDetailsState: TransferState = {
    toAccount: undefined,
    fromAccount: undefined,
    amount: undefined,
    transferType: undefined
  };
  @Output() validatedTransfer = new EventEmitter<Boolean>();

  constructor(
    private dateService: DateFormatService,
    private accountService: AccountService,
    @SkipSelf() private transferService: TransferService,
  ) { }

  updateInputDetailsState(partialState: Partial<TransferState>) {
    this.inputDetailsState = { ...this.inputDetailsState, ...partialState };
  }

  ngOnInit() {
    this.setDateTime();
    this.accountService.getKnownAccounts$().subscribe((knownAccounts) => {
      this.setStateToAccountCandidates(knownAccounts);
    });
    // TODO: Update this logic once multiple accounts owned by one person are supported
    this.accountService.getCurrentAccountDetails$().subscribe((currentAccountDetails) => {
      if (currentAccountDetails !== undefined) {
        this.setStateFromAccountCandidates([currentAccountDetails]);
      }
    });
  }

  setDateTime() {
    this.dateTime = this.getDateTime()
  }

  getDateTime(): string {
    const currentDateTime = this.dateService.getCurrentDate();
    return `${currentDateTime.day} ${currentDateTime.month} ${currentDateTime.year}
    ${currentDateTime.time} ${currentDateTime.location}`;
  }

  setStateToAccountCandidates(knownAccounts: DtoKnownAccountDTO[]) {
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
      this.inputDetailsState.transferType !== undefined
    ) {
        this.validatedTransfer.emit(true);
        this.transferService.setTransferData(this.inputDetailsState);
      }
  }
}

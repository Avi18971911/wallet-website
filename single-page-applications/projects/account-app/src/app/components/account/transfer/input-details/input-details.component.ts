import {DateFormatService} from "../../../../services/date-format.service";
import {TransferToComponent} from "../transfer-to/transfer-to.component";
import {Component, OnInit} from "@angular/core";
import {
  TransferFromWalletAccountDetails,
  TransferToWalletAccountDetails
} from "../../../../models/transfer-wallet-account-details";
import {AccountService} from "../../../../services/account.service";
import {InputDetailsState, TransferType} from "../../../../models/input-details-state";
import {DtoKnownAccountDTO} from "../../../../backend-api";
import {CurrentAccountDetails} from "../../../../models/current-account-details";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";
@Component({
  selector: 'app-input-details',
  standalone: true,
  imports: [
    TransferToComponent,
    MatButtonToggle,
    MatButton
  ],
  templateUrl: './input-details.component.html',
  styleUrl: './input-details.component.css'
})
export class InputDetailsComponent implements OnInit {
  protected dateTime: string = "";
  protected toAccountCandidates: Array<TransferToWalletAccountDetails> = [];
  protected fromAccountCandidates: Array<TransferFromWalletAccountDetails> = [];
  protected inputDetailsState: InputDetailsState = {
    toAccount: undefined,
    fromAccount: undefined,
    amount: undefined,
    transferType: undefined
  };

  constructor(
    private dateService: DateFormatService,
    private accountService: AccountService,
  ) { }

  updateInputDetailsState(partialState: Partial<InputDetailsState>) {
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
}

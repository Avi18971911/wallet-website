import {DateFormatService} from "../../../../services/date-format.service";
import {TransferToComponent} from "../transfer-to/transfer-to.component";
import {Component, OnInit} from "@angular/core";
import {TransferToWalletAccountDetails} from "../../../../models/transfer-to-wallet-account-details";
import {AccountService} from "../../../../services/account.service";

enum transferType {
  IMMEDIATE = "IMMEDIATE",
  SCHEDULED = "SCHEDULED"
}

interface InputDetailsState {
  toAccount: string;
  fromAccount: string;
  amount: number;
  transferType: transferType;
}

@Component({
  selector: 'app-input-details',
  standalone: true,
  imports: [
    TransferToComponent
  ],
  templateUrl: './input-details.component.html',
  styleUrl: './input-details.component.css'
})
export class InputDetailsComponent implements OnInit {
  protected dateTime: string = "";
  protected knownAccounts: Array<TransferToWalletAccountDetails> = [];
  protected inputDetailsState: InputDetailsState = {
    toAccount: "",
    fromAccount: "",
    amount: 0,
    transferType: transferType.IMMEDIATE,
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
    this.setStateFromUserData();
  }

  setDateTime() {
    this.dateTime = this.getDateTime()
  }

  getDateTime(): string {
    const currentDateTime = this.dateService.getCurrentDate();
    return `${currentDateTime.day} ${currentDateTime.month} ${currentDateTime.year}
    ${currentDateTime.time} ${currentDateTime.location}`;
  }

  setStateFromUserData() {
    const userData = this.accountService.getUserData();
    this.updateInputDetailsState({
      fromAccount: userData.accountNumber,
      amount: userData.availableBalance
    });
    this.knownAccounts = [];
    userData.knownAccounts.forEach((account) => {
      this.knownAccounts.push(
        {
          accountNumber: account.accountNumber,
          recipientName: account.accountHolder,
          accountType: this.formatAccountType(account.accountType)
        }
      );
    });
  }

  formatAccountType(accountType: string): string {
    return accountType.charAt(0).toUpperCase() + accountType.substring(1).toLowerCase()
  }
}

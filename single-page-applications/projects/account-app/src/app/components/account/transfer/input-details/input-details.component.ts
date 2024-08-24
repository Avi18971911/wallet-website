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

  get dateTime(): string {
    const currentDateTime = this.dateService.getCurrentDate();
    return `${currentDateTime.day} ${currentDateTime.month} ${currentDateTime.year}
    ${currentDateTime.time} ${currentDateTime.location}`;
  }

  updateInputDetailsState(partialState: Partial<InputDetailsState>) {
    this.inputDetailsState = { ...this.inputDetailsState, ...partialState };
  }

  ngOnInit() {
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
          accountType: account.accountType
        }
      );
    });
  }
}

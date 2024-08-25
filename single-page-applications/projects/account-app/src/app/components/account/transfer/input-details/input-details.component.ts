import {DateFormatService} from "../../../../services/date-format.service";
import {TransferToComponent} from "../transfer-to/transfer-to.component";
import {Component, OnInit} from "@angular/core";
import {TransferToWalletAccountDetails} from "../../../../models/transfer-to-wallet-account-details";
import {AccountService} from "../../../../services/account.service";
import {InputDetailsState, transferType} from "../../../../models/input-details-state";
import {DtoKnownAccountDTO} from "../../../../backend-api";
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
    this.accountService.getKnownAccounts$().subscribe((knownAccounts => {
      this.setStateFromKnownAccounts(knownAccounts);
    }));
  }

  setDateTime() {
    this.dateTime = this.getDateTime()
  }

  getDateTime(): string {
    const currentDateTime = this.dateService.getCurrentDate();
    return `${currentDateTime.day} ${currentDateTime.month} ${currentDateTime.year}
    ${currentDateTime.time} ${currentDateTime.location}`;
  }

  setStateFromKnownAccounts(knownAccounts: DtoKnownAccountDTO[]) {
    this.knownAccounts = knownAccounts.map ((account) => {
      return {
        accountNumber: account.accountNumber,
        recipientName: account.accountHolder,
        accountType: this.formatAccountType(account.accountType)
      }
    });
  }

  formatAccountType(accountType: string): string {
    return accountType.charAt(0).toUpperCase() + accountType.substring(1).toLowerCase()
  }
}

import {DateFormatService} from "../../../../services/date-format.service";
import {TransferToComponent} from "../transfer-to/transfer-to.component";
import {Component} from "@angular/core";

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
export class InputDetailsComponent {
  protected inputDetailsState: InputDetailsState = {
    toAccount: "",
    fromAccount: "",
    amount: 0,
    transferType: transferType.IMMEDIATE,
  };

  constructor(private dateService: DateFormatService) { }

  get dateTime(): string {
    const currentDateTime = this.dateService.getCurrentDate();
    return `${currentDateTime.day} ${currentDateTime.month} ${currentDateTime.year}
    ${currentDateTime.time} ${currentDateTime.location}`;
  }

  updateInputDetailsState(partialState: Partial<InputDetailsState>) {
    this.inputDetailsState = { ...this.inputDetailsState, ...partialState };
  }
}

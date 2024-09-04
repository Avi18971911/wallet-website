import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TransferState} from "../../../../../models/transfer-state";

@Component({
  selector: 'app-transfer-amount',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput
  ],
  templateUrl: './transfer-amount.component.html',
  styleUrl: './transfer-amount.component.css'
})
export class TransferAmountComponent {
  protected transferState: Partial<TransferState> = {
    amount: undefined,
  };

  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();
  onAmountChange() {
    this.emitTransferState();
  }

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }
}

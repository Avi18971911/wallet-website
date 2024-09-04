import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TransferState, TransferType} from "../../../../../models/transfer-state";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-transfer-type',
  standalone: true,
  imports: [
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './transfer-type.component.html',
  styleUrl: './transfer-type.component.css'
})
export class TransferTypeComponent {
  protected transferState: Partial<TransferState> = {
    // TODO: Update this logic to actually schedule the transfer and get the time of the transfer
    transferType: undefined,
  }

  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();

  onTransferTypeChange(event: MatRadioChange) {
    this.transferState.transferType = event.value;
    this.emitTransferState();
  }

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }
  protected readonly TransferType = TransferType;
}

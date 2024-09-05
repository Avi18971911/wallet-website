import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TransferState} from "../../../../../models/transfer-state";
import {NgIf} from "@angular/common";
import {MatError} from "@angular/material/select";

@Component({
  selector: 'app-transfer-amount',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatError,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './transfer-amount.component.html',
  styleUrl: './transfer-amount.component.css'
})
export class TransferAmountComponent implements OnInit {
  protected transferState: Partial<TransferState> = {
    amount: undefined,
  };
  protected amountControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+(\.\d{1,2})?$/), // Enforce NUMBER.NUMBER to two cents pattern
    Validators.min(0.01),
  ]);

  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();
  onAmountChange() {
    this.emitTransferState();
  }

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }

  private roundAndEnforcePattern(value: string | null): string {
    if (!value) return '';

    const numValue = parseFloat(value);
    const roundedValue = Math.ceil(numValue * 100) / 100;

    return roundedValue.toFixed(2);
  }


  ngOnInit() {
    this.amountControl.valueChanges.subscribe((value) => {
      const roundedValue = this.roundAndEnforcePattern(value);
      this.transferState.amount = roundedValue ? parseFloat(roundedValue) : undefined;
      this.emitTransferState();
    });
  }
}

import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TransferState} from "../../../../../models/transfer-state";
import {NgIf} from "@angular/common";
import {MatError} from "@angular/material/select";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-transfer-amount',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatError,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './transfer-amount.component.html',
  styleUrl: './transfer-amount.component.css'
})
export class TransferAmountComponent implements OnInit, OnDestroy, OnChanges {
  private ngUnsubscribe = new Subject<void>();
  protected transferState: Partial<TransferState> = {
    amount: undefined,
  };
  protected amountControl = new FormControl(this.transferState.amount, [
    Validators.required,
    Validators.pattern(/^\d+(\.\d{1,2})?$/), // Enforce NUMBER.NUMBER to two cents pattern
    Validators.min(0.01),
  ]);

  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }

  private roundAndEnforcePattern(value: number | null | undefined): number | undefined {
    if (!value) return undefined;
    const roundedValue = Math.ceil(value * 100) / 100;
    const roundedNum = parseFloat(roundedValue.toFixed(2));
    if (roundedNum !== value) {
      return undefined;
    }
    return roundedNum;
  }


  ngOnInit() {
    this.amountControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.transferState.amount = this.roundAndEnforcePattern(value);
        this.emitTransferState();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnChanges() {
    if (this.hasSubmitted) {
      this.amountControl.markAsTouched({ onlySelf: true });
    }
  }
}

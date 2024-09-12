import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class TransferAmountComponent implements OnDestroy, OnChanges {
  private ngUnsubscribe = new Subject<void>();
  protected transferState: Partial<TransferState> = {
    amount: undefined,
  };
  @Input() hasSubmitted: boolean = false;
  @Input() amountControl!: FormControl<number | undefined>;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnChanges(changes:SimpleChanges) {
    if (this.hasSubmitted) {
      this.amountControl.markAsTouched({onlySelf: true});
    }
    if (changes['amountControl'] && this.amountControl) {
      this.amountControl.valueChanges
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((value) => {
          this.transferState.amount = value;
          this.emitTransferState();
        });
    }
  }
}

import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {TransferState, TransferType} from "../../../../../models/transfer-state";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatError} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-transfer-type',
  standalone: true,
  imports: [
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    MatError,
    NgIf
  ],
  templateUrl: './transfer-type.component.html',
  styleUrl: './transfer-type.component.css'
})
export class TransferTypeComponent implements OnChanges, OnDestroy {
  protected transferState: Partial<TransferState> = {
    // TODO: Update this logic to actually schedule the transfer and get the time of the transfer
    transferType: undefined,
  }
  private ngUnsubscribe = new Subject<void>();
  @Input() hasSubmitted: boolean = false;
  @Input() typeControl!: FormControl<TransferType | undefined>
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }
  protected readonly TransferType = TransferType;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['typeControl'] && this.typeControl) {
      this.typeControl.valueChanges
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((value) => {
          this.transferState.transferType = value;
          this.emitTransferState();
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

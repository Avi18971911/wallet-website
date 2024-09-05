import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferState, TransferType} from "../../../../../models/transfer-state";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {type} from "node:os";
import {MatError} from "@angular/material/form-field";
import {NgIf} from "@angular/common";

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
export class TransferTypeComponent implements OnInit {
  protected transferState: Partial<TransferState> = {
    // TODO: Update this logic to actually schedule the transfer and get the time of the transfer
    transferType: undefined,
  }

  protected typeControl = new FormControl(this.transferState.transferType, [
    Validators.required,
  ])
  @Input() hasSubmitted: boolean = false;
  @Output() transferStateChange = new EventEmitter<Partial<TransferState>>();

  private emitTransferState() {
    this.transferStateChange.emit({ ...this.transferState });
  }
  protected readonly TransferType = TransferType;

  ngOnInit() {
    this.typeControl.valueChanges.subscribe((value) => {
      this.transferState.transferType = value ?? undefined;
      this.emitTransferState();
    });
  }
}

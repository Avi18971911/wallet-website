import { Injectable } from '@angular/core';
import {TransferState} from "../models/transfer-state";
import {BehaviorSubject, Subject} from "rxjs";
import {TransactionsService} from "../backend-api";

export interface TransferData {
  toAccountNumber: string;
  toAccountId: string;
  fromAccountNumber: string;
  fromAccountId: string;
  amount: number;
  recipientName: string;
}

@Injectable()
export class TransferService {
  private transferSubject = new BehaviorSubject<TransferData | undefined>(undefined);
  private transferData$ = this.transferSubject.asObservable();
  transferValidated = new Subject<void>()
  constructor(private transactionsService: TransactionsService) { }

  setTransferData(transferState: TransferState): void {
    if (!this.isTransferStateValid(transferState)) {
      console.error('Invalid transfer data.');
      return;
    }

    const transferData: TransferData = {
      toAccountNumber: transferState.toAccountNumber!,
      toAccountId: transferState.toAccountId!,
      fromAccountNumber: transferState.fromAccountNumber!,
      fromAccountId: transferState.fromAccountId!,
      amount: transferState.amount!,
      recipientName: transferState.recipientName!,
    }
    this.transferValidated.next()
    this.transferSubject.next(transferData)
  }

  clearTransferData(): void {
    this.transferSubject.next(undefined)
  }

  getTransferData() {
    return this.transferData$
  }

  submitTransfer() {
  }

  private isTransferStateValid(transferState: TransferState): boolean {
    return !!(
      transferState.toAccountNumber &&
      transferState.fromAccountNumber &&
      transferState.amount &&
      transferState.recipientName
    );
  }
}

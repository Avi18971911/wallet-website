import { Injectable } from '@angular/core';
import {TransferState} from "../models/transfer-state";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {DtoTransactionRequest, TransactionsService} from "../backend-api";

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
  transferCompleted = new Subject<void>()
  transferFailed = new Subject<void>()
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

  cancelTransferData(): void {
    this.clearTransferData()
    this.transferSubject.next(undefined)
  }

  getTransferData() {
    return this.transferData$
  }

  submitTransfer() {
    const transferData = this.transferSubject.value
    if (!transferData) {
      this.clearTransferData();
      this.transferFailed.next();
      return;
    }

    const transactionRequest: DtoTransactionRequest = {
      amount: transferData.amount,
      fromAccount: transferData.fromAccountId,
      toAccount: transferData.toAccountId,
    }

    this.transactionsService.transactionsPost(transactionRequest)
      .subscribe({
        next: () => {
          this.clearTransferData()
          this.transferCompleted.next()
        },
        error: (error) => {
          this.clearTransferData()
          this.transferFailed.next()
        }
      })
  }

  private isTransferStateValid(transferState: TransferState): boolean {
    return !!(
      transferState.toAccountNumber &&
      transferState.fromAccountNumber &&
      transferState.amount &&
      transferState.recipientName
    );
  }

  private clearTransferData() {
    this.transferSubject.next(undefined)
  }
}

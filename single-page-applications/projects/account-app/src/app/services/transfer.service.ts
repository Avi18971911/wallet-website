import { Injectable } from '@angular/core';
import {TransferState} from "../models/transfer-state";
import {Subject} from "rxjs";

export interface TransferData {
  toAccount: string;
  fromAccount: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  protected transferData: TransferData | undefined;
  transferValidated = new Subject<void>()
  constructor() { }

  setTransferData(transferState: TransferState): void {
    this.transferData = {
      toAccount: transferState.toAccount!,
      fromAccount: transferState.fromAccount!,
      amount: transferState.amount!
    }
    this.transferValidated.next()
  }
}

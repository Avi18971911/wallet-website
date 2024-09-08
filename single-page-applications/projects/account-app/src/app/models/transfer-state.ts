export enum TransferType {
  IMMEDIATE = "IMMEDIATE",
  SCHEDULED = "SCHEDULED"
}

export interface TransferState {
  toAccount: string | undefined;
  fromAccount: string | undefined;
  amount: number | undefined;
  transferType: TransferType | undefined;
  recipientName: string | undefined;
}

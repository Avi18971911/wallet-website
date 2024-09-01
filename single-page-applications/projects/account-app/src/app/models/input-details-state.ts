export enum TransferType {
  IMMEDIATE = "IMMEDIATE",
  SCHEDULED = "SCHEDULED"
}

export interface InputDetailsState {
  toAccount: string | undefined;
  fromAccount: string | undefined;
  amount: number | undefined;
  transferType: TransferType | undefined;
}

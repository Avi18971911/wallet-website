export enum transferType {
  IMMEDIATE = "IMMEDIATE",
  SCHEDULED = "SCHEDULED"
}

export interface InputDetailsState {
  toAccount: string | undefined;
  fromAccount: string | undefined;
  amount: number | undefined;
  transferType: transferType | undefined;
}

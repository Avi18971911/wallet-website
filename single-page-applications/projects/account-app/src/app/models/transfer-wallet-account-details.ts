export interface TransferToWalletAccountDetails {
  accountNumber: string;
  recipientName: string;
  accountType: string;
}

export interface TransferFromWalletAccountDetails {
  accountNumber: string;
  accountHolder: string;
  accountType: string;
}

import {Component, Input, Output} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {TransferToWalletAccountDetails} from "../../../../models/transferToWalletAccountDetails";

@Component({
  selector: 'app-transfer-to',
  standalone: true,
  imports: [
    MatSelect
  ],
  templateUrl: './transfer-to.component.html',
  styleUrl: './transfer-to.component.css'
})
export class TransferToComponent {
  @Input() candidateAccountDetails: Array<TransferToWalletAccountDetails> = [];
  @Output() selectedAccount: TransferToWalletAccountDetails | null = null;
}

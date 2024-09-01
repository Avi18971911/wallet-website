import {Component, OnInit} from '@angular/core';
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {TransferService} from "../../../services/transfer.service";

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    ProgressBarComponent,
    RouterOutlet
  ],
  templateUrl: './transfer-wallet-bank.component.html',
  styleUrl: './transfer-wallet-bank.component.css',
  providers: [TransferService],
})
export class TransferWalletBankComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.navigate(['input-details'], {relativeTo: this.route}).catch((error) => {
      console.error(error);
    });
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {TransferService} from "../../../services/transfer.service";
import {filter, Subscription} from "rxjs";

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
export class TransferWalletBankComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute) {}
  private routerSubscription: Subscription | undefined;

  ngOnInit() {
    this.navigateToInputDetails()

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.navigateToInputDetails()
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription)
      this.routerSubscription.unsubscribe();
  }

  private navigateToInputDetails() {
    this.router.navigate(['input-details'], {relativeTo: this.route}).catch((error) => {
      console.error(error);
    });
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {TransferService} from "../../../services/transfer.service";
import {filter, Subject, Subscription, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
  constructor(
    private router: Router, private route: ActivatedRoute,
    private transferService: TransferService,
  ) {}
  private ngUnsubscribe = new Subject<void>();
  protected currentStep: number = 1;

  ngOnInit() {
    this.navigateToInputDetails()

    this.transferService.transferValidated
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.navigateToVerifyDetails();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private navigateToInputDetails() {
    this.currentStep = 1;
    this.router.navigate(['input-details'], {relativeTo: this.route}).catch((error) => {
      console.error(error);
    });
  }

  private navigateToVerifyDetails() {
    console.log("Navigating to verify details");
    this.currentStep = 2;
    this.router.navigate(['verify-details'], {relativeTo: this.route}).catch((error) => {
      console.error(error);
    });
  }
}

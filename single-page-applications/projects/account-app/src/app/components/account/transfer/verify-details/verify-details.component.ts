import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransferData, TransferService} from "../../../../services/transfer.service";
import {Subject, takeUntil} from "rxjs";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-verify-details',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './verify-details.component.html',
  styleUrl: './verify-details.component.css'
})
export class VerifyDetailsComponent implements OnInit, OnDestroy {
  transferData: TransferData | undefined;
  private ngUnsubscribe = new Subject<void>();
  constructor(private transferService: TransferService) {}

  ngOnInit() {
    this.transferService.getTransferData()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((transferData) => {
        this.transferData = transferData;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

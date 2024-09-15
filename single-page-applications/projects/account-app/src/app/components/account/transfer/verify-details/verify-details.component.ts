import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TransferData, TransferService} from "../../../../services/transfer/transfer.service";
import {Subject, takeUntil} from "rxjs";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-verify-details',
  standalone: true,
  imports: [
    MatButton,
  ],
  templateUrl: './verify-details.component.html',
  styleUrl: './verify-details.component.css'
})
export class VerifyDetailsComponent implements OnInit, OnDestroy {
  transferData: TransferData | undefined;
  private ngUnsubscribe = new Subject<void>();
  @Output() cancelTransaction = new EventEmitter<void>();
  constructor(private transferService: TransferService) {}

  protected submitTransfer() {
    this.transferService.submitTransfer();
  }

  protected cancelTransfer() {
    this.transferService.cancelTransfer();
  }

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

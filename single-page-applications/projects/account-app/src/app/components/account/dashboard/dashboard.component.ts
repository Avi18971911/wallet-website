import {Component, OnInit} from '@angular/core';
import {DtoAccountDetailsDTO} from "../../../backend-api";
import {CommonModule} from "@angular/common";
import {BalanceChartComponent} from "./balance-chart/balance-chart.component";
import {DateFormatService} from "../../../services/date-format.service";
import {AccountService} from "../../../services/account.service";
import {LoadingSpinnerComponent} from "../../loading-spinner/loading-spinner.component";

interface CurrentMonthAndYear {
  month: string;
  year: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BalanceChartComponent, LoadingSpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  protected userFirstName: string | undefined;
  protected currentBalance: number | undefined;
  constructor(
    private accountService: AccountService,
    private dateService: DateFormatService,
  ) { }

  ngOnInit() {
    this.accountService.getFirstName$().subscribe((firstName) => { this.userFirstName = firstName })
    this.accountService.getCurrentBalance$().subscribe((currentBalance) => this.currentBalance = currentBalance)
  }

  get currentMonthAndYear(): CurrentMonthAndYear {
    const currentDateTime = this.dateService.getCurrentDate();
    const currentMonth = currentDateTime.month;
    const currentYear = parseInt(currentDateTime.year);
    return {
      month: currentMonth,
      year: currentYear,
    }
  }
}

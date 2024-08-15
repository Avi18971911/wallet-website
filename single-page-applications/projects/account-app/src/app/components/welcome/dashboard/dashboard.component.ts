import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import {HandlersAccountDetailsDTO} from "../../../backend-api";
import {CommonModule} from "@angular/common";
import {BalanceChartComponent} from "./balance-chart/balance-chart.component";
import {DateFormatService} from "../../../services/date-format.service";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BalanceChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  protected accountDetails: HandlersAccountDetailsDTO = { };
  protected currentMonth: string = "";
  protected currentYear: number = 0
  constructor(
    private authService: AuthService,
    private dateService: DateFormatService,
  ) { }

  ngOnInit() {
    this.accountDetails = this.authService.getUserData();
    this.setCurrentMonthAndYear();
  }

  setCurrentMonthAndYear(): void {
    const currentDateTime = this.dateService.getCurrentDate();
    this.currentMonth = currentDateTime.month;
    this.currentYear = parseInt(currentDateTime.year);
  }
}

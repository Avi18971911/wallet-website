import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import {HandlersAccountDetailsDTO} from "../../../backend-api";
import {CommonModule} from "@angular/common";
import {BalanceChartComponent} from "./balance-chart/balance-chart.component";
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
    private authService: AuthService
  ) { }

  private monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit() {
    this.accountDetails = this.authService.getUserData();
    this.setCurrentMonthAndYear();
  }

  setCurrentMonthAndYear(): void {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    this.currentMonth = this.monthNames[month]; // Ensuring two digits for the month
    this.currentYear = currentDate.getFullYear();
  }
}

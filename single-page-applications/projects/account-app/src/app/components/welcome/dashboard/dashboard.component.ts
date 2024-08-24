import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import {DtoAccountDetailsDTO} from "../../../backend-api";
import {CommonModule} from "@angular/common";
import {BalanceChartComponent} from "./balance-chart/balance-chart.component";
import {DateFormatService} from "../../../services/date-format.service";

interface CurrentMonthAndYear {
  month: string;
  year: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BalanceChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  protected accountDetails: DtoAccountDetailsDTO = {
    accountNumber: "",
    accountType: "",
    availableBalance: 0,
    id: "",
    knownAccounts: [],
    person: {
      firstName: "",
      lastName: "",
    },
    username: "",
    createdAt: "",
  };
  constructor(
    private authService: AuthService,
    private dateService: DateFormatService,
  ) { }

  ngOnInit() {
    this.accountDetails = this.authService.getUserData();
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

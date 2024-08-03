import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {isPlatformBrowser, NgIf} from "@angular/common";

@Component({
  selector: 'app-balance-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    NgIf
  ],
  templateUrl: './balance-chart.component.html',
  styleUrl: './balance-chart.component.css'
})
export class BalanceChartComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public isBrowser = isPlatformBrowser(this.platformId)
  public barChartLabels = ['Cash & Investments', 'Credit Card', 'Loans', 'Mortgage', 'Other'];
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56], label: 'Current'},
    {data: [28, 48, 40, 19, 86], label: 'Projected'}
  ];
}

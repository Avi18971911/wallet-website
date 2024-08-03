import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import {BarController, BarElement, CategoryScale, Chart, Colors, Legend, LinearScale, Title, Tooltip} from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, Colors, LinearScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'account-app';
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate(['/login']);
  }
}

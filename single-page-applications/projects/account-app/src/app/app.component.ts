import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import {BarController, BarElement, CategoryScale, Chart, Colors, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {AuthService} from "./services/auth.service";
import {AccountService} from "./services/account.service";

Chart.register(BarController, BarElement, CategoryScale, Colors, LinearScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'account-app';
  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
  ) {}
  ngOnInit() {
    this.router.navigate(['/login']);
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/welcome']);
      }
      else {
        this.router.navigate(['/login']);
      }
    });
    this.authService.loginResponse$.subscribe((response) => {
      if (response) {
        this.accountService.setUserData(response);
      }
    });
  }
}

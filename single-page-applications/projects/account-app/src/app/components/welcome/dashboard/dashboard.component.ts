import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import {HandlersAccountDetailsDTO} from "../../../backend-api";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  protected accountDetails: HandlersAccountDetailsDTO = { };
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.accountDetails = this.authService.getUserData()
    console.log("Dashboard deets", this.accountDetails);
  }
}

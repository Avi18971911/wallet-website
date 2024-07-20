import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AccountsService, HandlersAccountLoginDTO} from "../../backend-api";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected username: string;
  protected password: string;
  constructor(
    private accountService: AccountsService,
  ) {
    this.username = "";
    this.password = "";
  }
  onLogin() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.fetchUserData(this.username, this.password);
  }

  fetchUserData(userId: string, password: string) {
    const loginPayload: HandlersAccountLoginDTO = {
      username: userId,
      password: password
    }
    this.accountService.accountsLoginPost(loginPayload).subscribe((data) => {
      console.log(data);
    });
  }
}

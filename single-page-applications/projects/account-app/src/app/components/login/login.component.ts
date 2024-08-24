import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AccountsService, DtoAccountLoginDTO} from "../../backend-api";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('shake', [
      transition('void => *', [
        animate('0.5s', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-10px)', offset: 0.25 }),
          style({ transform: 'translateX(10px)', offset: 0.5 }),
          style({ transform: 'translateX(-10px)', offset: 0.75 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})

export class LoginComponent {
  protected username: string = "";
  protected password: string = "";
  protected errorMessage: string = "";
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private backendAccountService: AccountsService,
    private router: Router,
  ) { }
  onLogin() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.fetchUserData(this.username, this.password);
  }

  fetchUserData(userId: string, password: string) {
    const loginPayload: DtoAccountLoginDTO = {
      username: userId,
      password: password
    }
    this.backendAccountService.accountsLoginPost(loginPayload).subscribe(
      (data) => {
        this.errorMessage = "";
        this.accountService.setUserData(data);
        this.router.navigate(['/welcome'], { state: { accountData: data }})
      },
      (error) => {
        this.errorMessage = "Sorry, you have entered invalid credentials.";
      });
  }
}
